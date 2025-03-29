
import { format, addDays, subDays } from "date-fns";

// Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
}

export interface Grade {
  id: string;
  subject: string;
  value: number;
  date: string;
  comment?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  teacher?: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  color: string;
}

// Mock data
export const subjects: Subject[] = [
  { id: "1", name: "Математика", teacher: "Иванова А.В.", color: "#9b87f5" },
  { id: "2", name: "Русский язык", teacher: "Петрова О.Н.", color: "#7E69AB" },
  { id: "3", name: "Физика", teacher: "Сидоров И.П.", color: "#D6BCFA" },
  { id: "4", name: "История", teacher: "Козлов Н.Н.", color: "#F2FCE2" },
  { id: "5", name: "Биология", teacher: "Морозова Е.А.", color: "#FEC6A1" },
  { id: "6", name: "Информатика", teacher: "Новиков П.С.", color: "#E5DEFF" },
];

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Контрольная работа по алгебре",
    description: "Решение квадратных уравнений, теорема Виета",
    subject: "Математика",
    dueDate: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    status: "pending",
  },
  {
    id: "2",
    title: "Сочинение по произведению 'Война и мир'",
    description: "Написать сочинение-рассуждение на тему 'Образ Наташи Ростовой'",
    subject: "Русский язык",
    dueDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    status: "pending",
  },
  {
    id: "3",
    title: "Лабораторная работа",
    description: "Измерение ускорения свободного падения",
    subject: "Физика",
    dueDate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    status: "pending",
  },
  {
    id: "4",
    title: "Доклад по теме 'Петр I'",
    description: "Подготовить доклад о реформах Петра I",
    subject: "История",
    dueDate: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    status: "overdue",
  },
  {
    id: "5",
    title: "Тест по теме 'Клетка'",
    description: "Подготовиться к тесту по строению и функциям клетки",
    subject: "Биология",
    dueDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    status: "pending",
  },
  {
    id: "6",
    title: "Проект 'Мой сайт'",
    description: "Создать простой сайт на HTML/CSS",
    subject: "Информатика",
    dueDate: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    status: "completed",
  },
];

export const grades: Grade[] = [
  {
    id: "1",
    subject: "Математика",
    value: 5,
    date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    comment: "Отлично справился с контрольной работой",
  },
  {
    id: "2",
    subject: "Русский язык",
    value: 4,
    date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    comment: "Хорошая работа, небольшие ошибки в пунктуации",
  },
  {
    id: "3",
    subject: "Физика",
    value: 5,
    date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
  },
  {
    id: "4",
    subject: "История",
    value: 3,
    date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    comment: "Нужно более глубоко изучить материал",
  },
  {
    id: "5",
    subject: "Биология",
    value: 4,
    date: format(subDays(new Date(), 15), "yyyy-MM-dd"),
  },
  {
    id: "6",
    subject: "Информатика",
    value: 5,
    date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    comment: "Отличный проект!",
  },
  {
    id: "7",
    subject: "Математика",
    value: 4,
    date: format(subDays(new Date(), 20), "yyyy-MM-dd"),
  },
  {
    id: "8",
    subject: "Русский язык",
    value: 5,
    date: format(subDays(new Date(), 22), "yyyy-MM-dd"),
  },
];

export const notes: Note[] = [
  {
    id: "1",
    title: "Подготовка к контрольной по математике",
    content: "Повторить формулы сокращенного умножения, квадратные уравнения, системы уравнений",
    date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  },
  {
    id: "2",
    title: "Список литературы на лето",
    content: "1. Л.Н. Толстой - Война и мир\n2. Ф.М. Достоевский - Преступление и наказание\n3. И.С. Тургенев - Отцы и дети",
    date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
  },
  {
    id: "3",
    title: "Идеи для проекта по информатике",
    content: "- Создать сайт-портфолио\n- Разработать игру на JavaScript\n- Создать приложение для учета расходов",
    date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
  },
];

export const schedule: ScheduleItem[] = [
  // Понедельник
  {
    id: "101",
    subject: "Математика",
    room: "301",
    startTime: "8:30",
    endTime: "9:15",
    day: "Понедельник",
  },
  {
    id: "102",
    subject: "Русский язык",
    room: "204",
    startTime: "9:25",
    endTime: "10:10",
    day: "Понедельник",
  },
  {
    id: "103",
    subject: "Физика",
    room: "305",
    startTime: "10:20",
    endTime: "11:05",
    day: "Понедельник",
  },
  {
    id: "104",
    subject: "История",
    room: "208",
    startTime: "11:15",
    endTime: "12:00",
    day: "Понедельник",
  },
  
  // Вторник
  {
    id: "201",
    subject: "Биология",
    room: "403",
    startTime: "8:30",
    endTime: "9:15",
    day: "Вторник",
  },
  {
    id: "202",
    subject: "Информатика",
    room: "310",
    startTime: "9:25",
    endTime: "10:10",
    day: "Вторник",
  },
  {
    id: "203",
    subject: "Математика",
    room: "301",
    startTime: "10:20",
    endTime: "11:05",
    day: "Вторник",
  },
  
  // Среда
  {
    id: "301",
    subject: "Русский язык",
    room: "204",
    startTime: "8:30",
    endTime: "9:15",
    day: "Среда",
  },
  {
    id: "302",
    subject: "Физика",
    room: "305",
    startTime: "9:25",
    endTime: "10:10",
    day: "Среда",
  },
  {
    id: "303",
    subject: "История",
    room: "208",
    startTime: "10:20",
    endTime: "11:05",
    day: "Среда",
  },
  
  // Четверг
  {
    id: "401",
    subject: "Математика",
    room: "301",
    startTime: "8:30",
    endTime: "9:15",
    day: "Четверг",
  },
  {
    id: "402",
    subject: "Биология",
    room: "403",
    startTime: "9:25",
    endTime: "10:10",
    day: "Четверг",
  },
  {
    id: "403",
    subject: "Информатика",
    room: "310",
    startTime: "10:20",
    endTime: "11:05",
    day: "Четверг",
  },
  
  // Пятница
  {
    id: "501",
    subject: "Русский язык",
    room: "204",
    startTime: "8:30",
    endTime: "9:15",
    day: "Пятница",
  },
  {
    id: "502",
    subject: "Физика",
    room: "305",
    startTime: "9:25",
    endTime: "10:10",
    day: "Пятница",
  },
  {
    id: "503",
    subject: "История",
    room: "208",
    startTime: "10:20",
    endTime: "11:05",
    day: "Пятница",
  },
];

// Helper function to get subject color
export const getSubjectColor = (subjectName: string): string => {
  const subject = subjects.find((s) => s.name === subjectName);
  return subject?.color || "#9b87f5"; // Default to primary color if not found
};

// Helper function to get today's schedule
export const getTodaySchedule = (): ScheduleItem[] => {
  const today = new Date();
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const dayName = days[today.getDay()];
  
  if (dayName === "Суббота" || dayName === "Воскресенье") {
    return []; // No classes on weekend
  }
  
  return schedule.filter((item) => item.day === dayName);
};

// Helper function to get upcoming assignments (next 7 days)
export const getUpcomingAssignments = (): Assignment[] => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  return assignments.filter((assignment) => {
    const dueDate = new Date(assignment.dueDate);
    return dueDate >= today && dueDate <= nextWeek && assignment.status !== "completed";
  });
};

// Helper function to get recent grades (last 10)
export const getRecentGrades = (): Grade[] => {
  return [...grades]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
};
