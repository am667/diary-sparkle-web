
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { grades, subjects, getSubjectColor } from "@/services/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format, parseISO } from "date-fns";

const GradesOverview = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  // Filtered grades based on selected subject
  const filteredGrades = selectedSubject === "all"
    ? grades
    : grades.filter(grade => grade.subject === selectedSubject);
  
  // Sort grades by date (newest first)
  const sortedGrades = [...filteredGrades].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Calculate average grade
  const averageGrade = filteredGrades.length > 0
    ? (filteredGrades.reduce((sum, grade) => sum + grade.value, 0) / filteredGrades.length).toFixed(2)
    : "N/A";
  
  // Calculate grades distribution
  const gradesDistribution = {
    5: filteredGrades.filter(grade => grade.value === 5).length,
    4: filteredGrades.filter(grade => grade.value === 4).length,
    3: filteredGrades.filter(grade => grade.value === 3).length,
    2: filteredGrades.filter(grade => grade.value === 2).length,
    1: filteredGrades.filter(grade => grade.value === 1).length,
  };
  
  // Prepare chart data for grade trends
  const chartData = sortedGrades.map(grade => ({
    date: format(parseISO(grade.date), "dd.MM"),
    [grade.subject]: grade.value,
  }));
  
  // Prepare data for distribution chart
  const distributionData = [
    { grade: "5", count: gradesDistribution[5] },
    { grade: "4", count: gradesDistribution[4] },
    { grade: "3", count: gradesDistribution[3] },
    { grade: "2", count: gradesDistribution[2] },
    { grade: "1", count: gradesDistribution[1] },
  ];
  
  // Prepare data for subject averages
  const subjectAverages = subjects.map(subject => {
    const subjectGrades = grades.filter(grade => grade.subject === subject.name);
    const average = subjectGrades.length > 0
      ? subjectGrades.reduce((sum, grade) => sum + grade.value, 0) / subjectGrades.length
      : 0;
    
    return {
      subject: subject.name,
      average: Math.round(average * 10) / 10,
      color: getSubjectColor(subject.name),
    };
  });
  
  // Sort subject averages by average grade (highest first)
  subjectAverages.sort((a, b) => b.average - a.average);
  
  // Prepare data for subject averages chart
  const subjectAveragesData = subjectAverages.map(subject => ({
    subject: subject.subject,
    average: subject.average,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Оценки</h1>
          <p className="text-muted-foreground">
            Просмотр и анализ ваших оценок
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Выберите предмет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все предметы</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.name}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Средний балл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-diary-primary">
              {averageGrade}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedSubject === "all" 
                ? "По всем предметам" 
                : `По предмету ${selectedSubject}`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Всего оценок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-diary-primary">
              {filteredGrades.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedSubject === "all" 
                ? "По всем предметам" 
                : `По предмету ${selectedSubject}`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Последняя оценка</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredGrades.length > 0 ? (
              <>
                <div className="text-3xl font-bold text-diary-primary">
                  {filteredGrades[0].value}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(parseISO(filteredGrades[0].date), "dd.MM.yyyy")} по предмету {filteredGrades[0].subject}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Нет оценок</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Динамика оценок</CardTitle>
            <CardDescription>
              Ваши оценки за период времени
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    {selectedSubject === "all" 
                      ? subjects.map(subject => (
                          <Bar 
                            key={subject.id}
                            dataKey={subject.name} 
                            fill={getSubjectColor(subject.name)} 
                            maxBarSize={50}
                          />
                        ))
                      : <Bar 
                          dataKey={selectedSubject} 
                          fill={getSubjectColor(selectedSubject)} 
                          maxBarSize={50}
                        />
                    }
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Нет данных для отображения
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Распределение оценок</CardTitle>
            <CardDescription>
              Количество каждой оценки
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {filteredGrades.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Количество" 
                      fill="#9b87f5" 
                      maxBarSize={80}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Нет данных для отображения
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Средние баллы по предметам</CardTitle>
          <CardDescription>
            Сравнение ваших средних оценок по всем предметам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectAveragesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis 
                  type="category" 
                  dataKey="subject" 
                  width={100}
                />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="average" 
                  name="Средний балл" 
                  maxBarSize={50}
                >
                  {subjectAveragesData.map((entry, index) => (
                    <rect 
                      key={`cell-${index}`} 
                      fill={subjectAverages[index].color} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>История оценок</CardTitle>
          <CardDescription>
            Все ваши оценки в хронологическом порядке
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-4 py-3 font-medium">Дата</th>
                  <th className="px-4 py-3 font-medium">Предмет</th>
                  <th className="px-4 py-3 font-medium">Оценка</th>
                  <th className="px-4 py-3 font-medium">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {sortedGrades.length > 0 ? (
                  sortedGrades.map((grade) => (
                    <tr key={grade.id} className="border-b">
                      <td className="px-4 py-3">
                        {format(parseISO(grade.date), "dd.MM.yyyy")}
                      </td>
                      <td className="px-4 py-3">{grade.subject}</td>
                      <td className="px-4 py-3">
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium"
                          style={{ backgroundColor: getSubjectColor(grade.subject) }}
                        >
                          {grade.value}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {grade.comment || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      Нет оценок для отображения
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesOverview;
