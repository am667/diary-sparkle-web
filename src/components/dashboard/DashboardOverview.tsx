
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  getTodaySchedule, 
  getUpcomingAssignments, 
  getRecentGrades,
  getSubjectColor
} from "@/services/mockData";
import { format, parseISO } from "date-fns";
import { CalendarCheck, BookOpen, Award, Clock } from "lucide-react";

const DashboardOverview = () => {
  const todaySchedule = getTodaySchedule();
  const upcomingAssignments = getUpcomingAssignments();
  const recentGrades = getRecentGrades().slice(0, 4);
  
  // Get user info
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userRole = user?.role || "student";
  
  // Get current time
  const now = new Date();
  const currentTime = format(now, "HH:mm");
  const currentClass = todaySchedule.find(
    (item) => currentTime >= item.startTime && currentTime <= item.endTime
  );
  
  // Get next class
  const nextClass = todaySchedule.find(
    (item) => item.startTime > currentTime
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Сегодня уроков</CardTitle>
            <CalendarCheck className="h-4 w-4 text-diary-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySchedule.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {currentClass 
                ? `Сейчас: ${currentClass.subject}` 
                : nextClass 
                  ? `Следующий: ${nextClass.subject} в ${nextClass.startTime}` 
                  : "Уроки на сегодня закончились"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ближайшие задания</CardTitle>
            <BookOpen className="h-4 w-4 text-diary-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAssignments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {upcomingAssignments.length > 0 
                ? `Ближайший дедлайн: ${format(parseISO(upcomingAssignments[0].dueDate), "dd.MM.yyyy")}` 
                : "Нет заданий на ближайшую неделю"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
            <Award className="h-4 w-4 text-diary-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentGrades.length > 0 
                ? (recentGrades.reduce((sum, grade) => sum + grade.value, 0) / recentGrades.length).toFixed(1)
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {recentGrades.length > 0 
                ? `На основе последних ${recentGrades.length} оценок` 
                : "Нет последних оценок"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Время</CardTitle>
            <Clock className="h-4 w-4 text-diary-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{format(now, "HH:mm")}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(now, "EEEE, d MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Сегодняшнее расписание</CardTitle>
            <CardDescription>
              {todaySchedule.length > 0 
                ? `${todaySchedule.length} уроков сегодня` 
                : "Сегодня нет уроков"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-10 rounded-l-md mr-3" 
                        style={{ backgroundColor: getSubjectColor(item.subject) }}
                      />
                      <div>
                        <h3 className="font-medium">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          Кабинет {item.room}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.startTime} - {item.endTime}</p>
                      {currentTime >= item.startTime && currentTime <= item.endTime && (
                        <Badge variant="secondary" className="bg-diary-light text-diary-primary">
                          Сейчас
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Сегодня выходной день
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Ближайшие задания</CardTitle>
            <CardDescription>
              Задания, которые нужно выполнить в ближайшие 7 дней
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssignments.slice(0, 5).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-10 rounded-l-md mr-3" 
                        style={{ backgroundColor: getSubjectColor(assignment.subject) }}
                      />
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {format(parseISO(assignment.dueDate), "dd.MM.yyyy")}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={
                          assignment.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-diary-light text-diary-primary"
                        }
                      >
                        {assignment.status === "overdue"
                          ? "Просрочено"
                          : "До сдачи"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Нет заданий на ближайшую неделю
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Последние оценки</CardTitle>
          <CardDescription>
            Ваши недавние оценки по предметам
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentGrades.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentGrades.map((grade) => (
                <div 
                  key={grade.id} 
                  className="flex items-center p-4 rounded-lg border border-border"
                >
                  <div 
                    className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
                    style={{ 
                      backgroundColor: getSubjectColor(grade.subject),
                      color: 'white'
                    }}
                  >
                    <span className="text-xl font-bold">{grade.value}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{grade.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(grade.date), "dd.MM.yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Нет недавних оценок
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
