
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignments, subjects, Assignment } from "@/services/mockData";
import { format, parseISO } from "date-fns";
import { Check, X, ChevronDown, ChevronUp, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

const AssignmentsList = () => {
  const [assignmentsList, setAssignmentsList] = useState<Assignment[]>(assignments);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Get user info
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userRole = user?.role || "student";
  const isStudent = userRole === "student";
  
  const handleStatusChange = (id: string, newStatus: "completed" | "pending" | "overdue") => {
    setAssignmentsList(
      assignmentsList.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: newStatus }
          : assignment
      )
    );
    
    const assignment = assignmentsList.find((a) => a.id === id);
    if (assignment) {
      toast.success(`Задание "${assignment.title}" отмечено как ${newStatus === "completed" ? "выполненное" : "невыполненное"}`);
    }
  };
  
  const filteredAssignments = assignmentsList
    .filter((assignment) => {
      // Search filter
      const matchesSearch = 
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.description.toLowerCase().includes(search.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(search.toLowerCase());
      
      // Subject filter
      const matchesSubject = 
        subjectFilter === "all" || assignment.subject === subjectFilter;
      
      // Status filter
      const matchesStatus = 
        statusFilter === "all" || assignment.status === statusFilter;
      
      return matchesSearch && matchesSubject && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "dueDate") {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else { // title
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
  
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Задания</CardTitle>
        <CardDescription>
          Список всех заданий и их статусы
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск заданий..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Предмет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все предметы</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает выполнения</SelectItem>
                  <SelectItem value="completed">Выполнено</SelectItem>
                  <SelectItem value="overdue">Просрочено</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => toggleSort("title")}
                    >
                      Название <SortIcon field="title" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Предмет</th>
                  <th className="text-left py-3 px-4 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => toggleSort("dueDate")}
                    >
                      Срок сдачи <SortIcon field="dueDate" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Статус</th>
                  {isStudent && (
                    <th className="text-right py-3 px-4 font-medium">Действия</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {assignment.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{assignment.subject}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {format(parseISO(assignment.dueDate), "dd.MM.yyyy")}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            assignment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : assignment.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-diary-light text-diary-primary"
                          }
                        >
                          {assignment.status === "completed"
                            ? "Выполнено"
                            : assignment.status === "overdue"
                            ? "Просрочено"
                            : "Ожидает выполнения"}
                        </Badge>
                      </td>
                      {isStudent && (
                        <td className="py-3 px-4 text-right">
                          {assignment.status !== "completed" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(assignment.id, "completed")}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Выполнено
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(assignment.id, "pending")}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Не выполнено
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isStudent ? 5 : 4} className="py-8 text-center text-muted-foreground">
                      Заданий не найдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentsList;
