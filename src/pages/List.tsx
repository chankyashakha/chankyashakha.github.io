import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";

import {
  MoreHorizontal, Trash2, Check, X, Search,
  ArrowUpDown, ArrowUp, ArrowDown,
} from "lucide-react";

import { graphqlRequest, QUERIES, MUTATIONS } from "@/lib/graphql";
import Navbar from "@/components/Navbar";

/* TYPE DEFINITIONS */
interface ContactData {
  id: number;
  address: string;
  age: number;
  basti_code: string;
  dob: string;
  full_name: string;
  hindi_full_name: string;
  include_sons: boolean;
  joining_date: string;
  mobile: string;
  org: string;
  verified: boolean;
}

interface ContactsResponse {
  contact_data: ContactData[];
}

export default function List() {
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingField, setEditingField] = useState<{ id: number; field: keyof ContactData } | null>(null);
  const [editedValue, setEditedValue] = useState<any>("");

  const [sortField, setSortField] = useState<keyof ContactData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [updateEnabled, setUpdateEnabled] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* FETCH CONTACTS */
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => graphqlRequest<ContactsResponse>(QUERIES.GET_CONTACTS),
    staleTime: 5 * 60 * 1000,
  });

  /* FILTER + SORT */
  const filteredContacts = useMemo(() => {
    if (!data?.contact_data) return [];

    let result = data.contact_data;

    // searching
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      result = result.filter((c) =>
        [c.full_name, c.hindi_full_name, c.mobile, c.address, c.org, c.basti_code]
          .some((v) => String(v || "").toLowerCase().includes(s))
      );
    }

    // sorting
    if (sortField) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortField] ?? "";
        const bVal = b[sortField] ?? "";

        if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
          return sortOrder === "asc"
            ? Number(aVal) - Number(bVal)
            : Number(bVal) - Number(aVal);
        }

        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  }, [data, searchTerm, sortField, sortOrder]);

  /* UPDATE SINGLE FIELD */
  const updateMutation = useMutation({
    mutationFn: (variables: { id: number; data: Partial<ContactData> }) =>
      graphqlRequest(MUTATIONS.UPDATE_CONTACT, variables),

    onSuccess: (_, variables) => {
  const { id, data: updatedField } = variables;

  queryClient.setQueryData(["contacts"], (oldData: ContactsResponse | undefined) => {
    if (!oldData) return oldData;

    return {
      contact_data: oldData.contact_data.map((c) =>
        c.id === id ? { ...c, ...updatedField } : c
      ),
    };
  });

  setEditingField(null);
  setEditedValue("");
  toast.success("Updated successfully");
},

    onError: (err) => toast.error(err.message),
  });

  /* DELETE CONTACT */
  const deleteMutation = useMutation({
    mutationFn: (id: number) => graphqlRequest(MUTATIONS.DELETE_CONTACT, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Deleted");
      setDeleteId(null);
    },
    onError: (err) => toast.error(err.message),
  });

  /* SORT HANDLER */
  const handleSort = (field: keyof ContactData) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  /* SORT ICON COMPONENT */
  const SortIcon = ({ field }: { field: keyof ContactData }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 inline ml-2 opacity-40" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 inline ml-2" />
    ) : (
      <ArrowDown className="w-4 h-4 inline ml-2" />
    );
  };

  /* EDIT CELL */
  const startFieldEdit = (contact: ContactData, field: keyof ContactData) => {
    if (!updateEnabled) return toast.error("Enable updates first");
    setEditingField({ id: contact.id, field });
    console.log(contact, field);
    setEditedValue(contact[field]);
  };

  const saveFieldEdit = () => {
    if (!editingField) return;
    updateMutation.mutate({
      id: editingField.id,
      data: { [editingField.field]: editedValue },
    });
  };

  const cancelFieldEdit = () => {
    setEditingField(null);
    setEditedValue("");
  };

  const renderVerifiedToggle = (contact: ContactData) => {
  return (
    <div className="flex items-center h-10">
      <Switch
        checked={contact.verified}
        disabled={!updateEnabled}
        onCheckedChange={(value) => {
          if (!updateEnabled) return toast.error("Enable updates first");

          updateMutation.mutate({
            id: contact.id,
            data: { verified: value },
          });
        }}
      />
    </div>
  );
};


  const renderTableCell = (contact: ContactData, field: keyof ContactData) => {
    const isEditing = editingField?.id === contact.id && editingField?.field === field;

    if (isEditing) {
      return (
        <div className="flex gap-1 items-center h-10">
          <Input
            autoFocus
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveFieldEdit();
              if (e.key === "Escape") cancelFieldEdit();
            }}
            className="h-8 text-sm flex-1 min-w-[100px]"
          />
          <Button size="sm" variant="ghost" onClick={saveFieldEdit}>
            <Check className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={cancelFieldEdit}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <div
        className={`p-2 h-10 flex items-center ${
          updateEnabled ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" : ""
        }`}
        onClick={() => startFieldEdit(contact, field)}
      >
        {String(contact[field] ?? "-")}
      </div>
    );
  };

  /* LOADING & ERROR */
  if (isLoading) return <div className="p-12 text-center">Loading...</div>;
  if (error) return <div className="p-12 text-center text-red-600">{error.message}</div>;

  /* CONTACTS */
  const contacts = filteredContacts;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact List</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Search + Enable Update */}
            <div className="flex justify-between mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search contacts…"
                  className="pl-10"
                />
              </div>

              <div className="ml-4 flex items-center gap-3">
                <span className={updateEnabled ? "text-green-600" : "text-gray-600"}>
                  {updateEnabled ? "Updates and Show Phone" : "Updates and Show Phone"}
                </span>
                <Switch
                  checked={updateEnabled}
                  onCheckedChange={(v) => {
                    if (v) setPasswordDialogOpen(true);
                    else setUpdateEnabled(false);
                  }}
                />
              </div>
            </div>

            {/* TABLE SCROLL WRAPPER */}
            <div className="max-h-[500px] overflow-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead onClick={() => handleSort("verified")} className="cursor-pointer">
                      Verified<SortIcon field="verified" />
                    </TableHead> */}

                    <TableHead onClick={() => handleSort("full_name")} className="cursor-pointer">
                      Full Name <SortIcon field="full_name" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("hindi_full_name")} className="cursor-pointer">
                      Hindi Name <SortIcon field="hindi_full_name" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("mobile")} className="cursor-pointer">
                      Mobile <SortIcon field="mobile" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("address")} className="cursor-pointer">
                      Address <SortIcon field="address" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("age")} className="cursor-pointer">
                      Age <SortIcon field="age" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("org")} className="cursor-pointer">
                      Org <SortIcon field="org" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("dob")} className="cursor-pointer">
                      DOB <SortIcon field="dob" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("joining_date")} className="cursor-pointer">
                      Joining <SortIcon field="joining_date" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("basti_code")} className="cursor-pointer">
                      Basti <SortIcon field="basti_code" />
                    </TableHead>

                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {contacts.map((c) => (
                    <TableRow key={c.id}>
                      {/* <TableCell>{renderVerifiedToggle(c)}</TableCell> */}
                      <TableCell>{renderTableCell(c, "full_name")}</TableCell>
                      <TableCell>{renderTableCell(c, "hindi_full_name")}</TableCell>
                      <TableCell>{renderTableCell(c, "mobile")}</TableCell>
                      <TableCell>{renderTableCell(c, "address")}</TableCell>
                      <TableCell>{renderTableCell(c, "age")}</TableCell>
                      <TableCell>{renderTableCell(c, "org")}</TableCell>
                      <TableCell>{renderTableCell(c, "dob")}</TableCell>
                      <TableCell>{renderTableCell(c, "joining_date")}</TableCell>
                      <TableCell>{renderTableCell(c, "basti_code")}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => setDeleteId(c.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DELETE DIALOG */}
      <AlertDialog open={deleteId != null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end gap-4">
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMutation.mutate(deleteId!)}>
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* PASSWORD DIALOG */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Updates</DialogTitle>
            <DialogDescription>Enter password</DialogDescription>
          </DialogHeader>

          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                if (password === "jaishreeram") {
                  setUpdateEnabled(true);
                  setPasswordDialogOpen(false);
                  setPasswordError("");
                } else {
                  setPasswordError("Incorrect password");
                }
              }}
            >
              Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
