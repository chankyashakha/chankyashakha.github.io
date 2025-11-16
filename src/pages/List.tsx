import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Trash2,
  Check,
  X,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  graphqlRequest,
  QUERIES,
  MUTATIONS,
} from "@/lib/graphql";
import Navbar from "@/components/Navbar";

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

interface EditableRow {
  id: number;
  [key: string]: any;
}

export default function List() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingField, setEditingField] = useState<{
    id: number;
    field: string;
  } | null>(null);
  const [editedData, setEditedData] = useState<EditableRow | null>(null);
  const [sortField, setSortField] = useState<keyof ContactData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => graphqlRequest<ContactsResponse>(QUERIES.GET_CONTACTS),
    staleTime: 1000 * 60 * 5,
  });

  const filteredContacts = useMemo(() => {
    if (!data?.contact_data) return [];
    
    let result = data.contact_data;
    
    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (contact) =>
          String(contact.full_name || "").toLowerCase().includes(lowerSearchTerm) ||
          String(contact.hindi_full_name || "").toLowerCase().includes(lowerSearchTerm) ||
          String(contact.mobile || "").toLowerCase().includes(lowerSearchTerm) ||
          String(contact.address || "").toLowerCase().includes(lowerSearchTerm) ||
          String(contact.org || "").toLowerCase().includes(lowerSearchTerm) ||
          String(contact.basti_code || "").toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply sorting
    if (sortField) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        // Handle null/undefined
        if (aVal == null) aVal = "";
        if (bVal == null) bVal = "";
        
        // Convert to string for comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        // Try numeric comparison if both are numbers
        const aNum = Number(aVal);
        const bNum = Number(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        if (sortOrder === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }
    
    return result;
  }, [data, searchTerm, sortField, sortOrder]);

  const handleSort = (field: keyof ContactData) => {
    if (sortField === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and reset to ascending
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: keyof ContactData) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 opacity-40" />;
    }
    return sortOrder === "asc" ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const updateMutation = useMutation({
    mutationFn: async (variables: {
      id: number;
      data: Partial<ContactData>;
    }) => {
      return graphqlRequest(MUTATIONS.UPDATE_CONTACT, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setEditingField(null);
      setEditedData(null);
      toast.success("Contact updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return graphqlRequest(MUTATIONS.DELETE_CONTACT, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteId(null);
      toast.success("Contact deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });

  const startEdit = (contact: ContactData) => {
    setEditingField({ id: contact.id, field: "full_name" });
    setEditedData({ ...contact });
  };

  const startFieldEdit = (id: number, field: string) => {
    setEditingField({ id, field });
    const contact = data?.contact_data.find((c) => c.id === id);
    if (contact) {
      setEditedData({ ...contact });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: value,
      });
    }
  };

  const saveFieldEdit = async () => {
    if (!editingField || !editedData) return;

    const { id, ...updateData } = editedData;
    updateMutation.mutate({
      id,
      data: updateData as Partial<ContactData>,
    });
  };

  const cancelFieldEdit = () => {
    setEditingField(null);
    setEditedData(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  const handleToggleVerified = (contact: ContactData) => {
    const { id, ...updateData } = contact;
    updateMutation.mutate({
      id,
      data: {
        ...updateData,
        verified: !contact.verified,
      } as Partial<ContactData>,
    });
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-red-500">
            Error loading contacts: {error.message}
          </p>
        </div>
      </div>
    );
  }

  const contacts = filteredContacts;

  const renderTableCell = (contact: ContactData, field: keyof ContactData) => {
    const isEditing =
      editingField?.id === contact.id && editingField?.field === field;
    const value = editedData?.[field] ?? contact[field];

    if (isEditing) {
      return (
        <div className="flex gap-1 items-center h-10 min-h-10">
          <Input
            autoFocus
            value={value || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveFieldEdit();
              if (e.key === "Escape") cancelFieldEdit();
            }}
            className="h-8 text-sm flex-1 min-w-0"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={saveFieldEdit}
            disabled={updateMutation.isPending}
            className="h-8 w-8 p-0 flex-shrink-0"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={cancelFieldEdit}
            className="h-8 w-8 p-0 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div
        onClick={() => startFieldEdit(contact.id, field)}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors h-10 flex items-center"
        title="Click to edit"
      >
        {typeof value === "string" || typeof value === "number"
          ? String(value)
          : "-"}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <Card className="border overflow-hidden">
          <CardHeader className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b">
            <CardTitle>Contact Directory</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Search by name, mobile, address, organization, or basti code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="h-10 flex-shrink-0"
                >
                  Clear
                </Button>
              )}
            </div>

            {contacts.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Showing {contacts.length} of {data?.contact_data.length} contacts
              </p>
            )}

            <div className="border rounded-md overflow-hidden" style={{ scrollbarGutter: "stable" }}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[150px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("full_name")}>
                        <div className="flex items-center gap-2">
                          Full Name {getSortIcon("full_name")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[150px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("hindi_full_name")}>
                        <div className="flex items-center gap-2">
                          Hindi Name {getSortIcon("hindi_full_name")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[120px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("mobile")}>
                        <div className="flex items-center gap-2">
                          Mobile {getSortIcon("mobile")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[200px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("address")}>
                        <div className="flex items-center gap-2">
                          Address {getSortIcon("address")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("age")}>
                        <div className="flex items-center gap-2">
                          Age {getSortIcon("age")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("org")}>
                        <div className="flex items-center gap-2">
                          Organization {getSortIcon("org")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("dob")}>
                        <div className="flex items-center gap-2">
                          DOB {getSortIcon("dob")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[120px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("joining_date")}>
                        <div className="flex items-center gap-2">
                          Joining Date {getSortIcon("joining_date")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px] h-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSort("basti_code")}>
                        <div className="flex items-center gap-2">
                          Basti Code {getSortIcon("basti_code")}
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] h-10">Verified</TableHead>
                      <TableHead className="w-[100px] h-10">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150 h-10">
                        <TableCell className="py-0">
                          {renderTableCell(contact, "full_name")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "hindi_full_name")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "mobile")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "address")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "age")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "org")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "dob")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "joining_date")}
                        </TableCell>
                        <TableCell className="py-0">
                          {renderTableCell(contact, "basti_code")}
                        </TableCell>
                        <TableCell className="py-0">
                          <Button
                            variant={contact.verified ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleVerified(contact)}
                            disabled={updateMutation.isPending}
                            className="h-8 text-xs"
                          >
                            {contact.verified ? "✓ Yes" : "○ No"}
                          </Button>
                        </TableCell>
                        <TableCell className="py-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleDelete(contact.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {contacts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm ? "No contacts match your search" : "No contacts found"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteId !== null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4">
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
