import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// Replace with your actual GraphQL query
import { graphqlRequest, QUERIES } from "@/lib/graphql";

/* TYPE DEFINITIONS */
interface TeamMember {
  id: number;
  full_name: string;
  mobile: string;
  basti_code: string;
  role: string;
}

interface TeamListResponse {
  team_members: TeamMember[];
}

export default function GharSamparkTeam() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TeamMember | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /* FETCH LIST */
  const { data, isLoading, error } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => graphqlRequest<TeamListResponse>(QUERIES.GET_TEAM_MEMBERS),
  });

  /* SORT HANDLER */
  const handleSort = (field: keyof TeamMember) => {
    if (sortField === field) {
      setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ field }: { field: keyof TeamMember }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 inline ml-1 opacity-40" />;
    return sortOrder === "asc" ? <ArrowUp className="w-4 h-4 inline ml-1" /> : <ArrowDown className="w-4 h-4 inline ml-1" />;
  };

  /* FILTER + SORT */
  const filtered = useMemo(() => {
    if (!data?.team_members) return [];

    let result = data.team_members;

    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      result = result.filter((t) =>
        [t.full_name, t.mobile, t.basti_code, t.role]
          .some((v) => String(v || "").toLowerCase().includes(s))
      );
    }

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

  if (isLoading) return <div className="p-12 text-center">Loading...</div>;
  if (error) return <div className="p-12 text-center text-red-600">{error.message}</div>;

  const members = filtered;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-10 px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">व्यापक गृह संपर्क अभियान — टोली सदस्य सूची</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-sm">
              <strong>वृहद गृह संपर्क अभियान</strong> का उद्देश्य प्रत्येक गांव और बस्ती के अधिकतम घरों तक पहुँचना है।
              आगामी विजयादशमी से राष्ट्रीय स्वयंसेवक संघ के शताब्दी वर्ष के अवसर पर यह अभियान प्रारम्भ हो रहा है।
              देशभर में लगभग 20 लाख कार्यकर्ता 20 करोड़ परिवारों तक संपर्क करेंगे।
              {/* (You can expand this text or fetch dynamically from server.) */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>टोली सदस्य सूची</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search team members..."
                className="pl-10"
              />
            </div>

            <div className="max-h-[500px] overflow-auto border rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort("full_name")} className="cursor-pointer">
                      Name <SortIcon field="full_name" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("mobile")} className="cursor-pointer">
                      Mobile <SortIcon field="mobile" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("basti_code")} className="cursor-pointer">
                      Basti Code <SortIcon field="basti_code" />
                    </TableHead>

                    <TableHead onClick={() => handleSort("role")} className="cursor-pointer">
                      Role <SortIcon field="role" />
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {members.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.full_name}</TableCell>
                      <TableCell>{m.mobile}</TableCell>
                      <TableCell>{m.basti_code}</TableCell>
                      <TableCell>{m.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
