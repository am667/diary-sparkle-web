
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schedule, getSubjectColor } from "@/services/mockData";
import { Clock } from "lucide-react";

// Days of the week for filtering
const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

const ScheduleView = () => {
  const [activeTab, setActiveTab] = useState<string>("daily");
  const [selectedDay, setSelectedDay] = useState<string>(DAYS[0]);
  
  // Get current day name
  const today = new Date();
  const dayIndex = today.getDay();
  const currentDayName = dayIndex === 0 || dayIndex === 6 
    ? "Понедельник" // Default to Monday for weekends
    : DAYS[dayIndex - 1];
  
  // Filter schedule by selected day
  const dailySchedule = schedule.filter((item) => item.day === selectedDay);
  
  // Group schedule by day for weekly view
  const weeklySchedule = DAYS.map((day) => ({
    day,
    classes: schedule.filter((item) => item.day === day),
  }));
  
  // Check if there's a current ongoing class
  const currentTime = `${today.getHours()}:${today.getMinutes().toString().padStart(2, '0')}`;
  const currentClass = schedule.find(
    (item) => 
      item.day === currentDayName && 
      currentTime >= item.startTime && 
      currentTime <= item.endTime
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Расписание уроков</h1>
          <p className="text-muted-foreground">
            Просмотр вашего расписания уроков
          </p>
        </div>
        
        <Tabs 
          defaultValue="daily" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">По дням</TabsTrigger>
            <TabsTrigger value="weekly">На неделю</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {activeTab === "daily" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Выберите день" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {currentDayName === selectedDay && currentClass && (
              <div className="bg-diary-light text-diary-primary px-4 py-2 rounded-md inline-flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Сейчас: {currentClass.subject}, кабинет {currentClass.room}</span>
              </div>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{selectedDay}</CardTitle>
              <CardDescription>
                {dailySchedule.length} уроков
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dailySchedule.length > 0 ? (
                <div className="space-y-4">
                  {dailySchedule.map((item) => {
                    const isCurrent = 
                      currentDayName === selectedDay && 
                      currentTime >= item.startTime && 
                      currentTime <= item.endTime;
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`
                          p-4 rounded-lg border flex items-center
                          ${isCurrent ? 'border-diary-primary bg-diary-light/30' : 'border-border'}
                        `}
                      >
                        <div 
                          className="w-2 h-14 rounded-md mr-4" 
                          style={{ backgroundColor: getSubjectColor(item.subject) }}
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium text-lg">{item.subject}</h3>
                          <p className="text-muted-foreground">
                            Кабинет {item.room}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{item.startTime} - {item.endTime}</p>
                          <p className="text-sm text-muted-foreground">
                            {/* Would display teacher in a real app */}
                            {item.teacher || ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Нет уроков в этот день
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "weekly" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {weeklySchedule.map(({ day, classes }) => (
            <Card key={day} className={day === currentDayName ? "border-diary-primary" : ""}>
              <CardHeader className={day === currentDayName ? "bg-diary-light/30" : ""}>
                <CardTitle>{day}</CardTitle>
                <CardDescription>
                  {classes.length} уроков
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-y-auto">
                {classes.length > 0 ? (
                  <div className="space-y-3">
                    {classes.map((item) => {
                      const isCurrent = 
                        day === currentDayName && 
                        currentTime >= item.startTime && 
                        currentTime <= item.endTime;
                      
                      return (
                        <div 
                          key={item.id} 
                          className={`
                            p-3 rounded-md border flex items-center
                            ${isCurrent ? 'border-diary-primary bg-diary-light/30' : 'border-border'}
                          `}
                        >
                          <div 
                            className="w-2 h-10 rounded-md mr-3" 
                            style={{ backgroundColor: getSubjectColor(item.subject) }}
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.subject}</h3>
                            <p className="text-xs text-muted-foreground">
                              Кабинет {item.room}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.startTime} - {item.endTime}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Нет уроков в этот день
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
