
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PenSquare, Plus, Trash2, Edit, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { notes as initialNotes, Note } from "@/services/mockData";

const NotesView = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleOpenDialog = (note?: Note) => {
    if (note) {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
    } else {
      setSelectedNote(null);
      setTitle("");
      setContent("");
    }
    setOpenDialog(true);
  };
  
  const handleSaveNote = () => {
    if (!title.trim()) {
      toast.error("Пожалуйста, введите заголовок заметки");
      return;
    }
    
    if (selectedNote) {
      // Update existing note
      const updatedNotes = notes.map(note => 
        note.id === selectedNote.id
          ? { ...note, title, content, date: format(new Date(), "yyyy-MM-dd") }
          : note
      );
      setNotes(updatedNotes);
      toast.success("Заметка обновлена");
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        date: format(new Date(), "yyyy-MM-dd")
      };
      setNotes([newNote, ...notes]);
      toast.success("Заметка создана");
    }
    
    setOpenDialog(false);
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Заметка удалена");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Мои заметки</h1>
          <p className="text-muted-foreground">
            Создавайте и управляйте своими заметками
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-diary-primary hover:bg-diary-secondary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Новая заметка
        </Button>
      </div>
      
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <Card 
              key={note.id} 
              className="overflow-hidden card-hover h-64 flex flex-col"
            >
              <div className="p-4 bg-diary-light flex items-center justify-between">
                <h3 className="font-medium text-diary-primary truncate">
                  {note.title}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(note)}
                  >
                    <Edit className="h-4 w-4 text-diary-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-diary-primary" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="mb-2 text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {note.date}
                </div>
                <ScrollArea className="flex-grow">
                  <div className="whitespace-pre-line text-sm">
                    {note.content}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <PenSquare className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Нет заметок</h3>
          <p className="mt-1 text-muted-foreground">
            Создайте свою первую заметку, нажав на кнопку "Новая заметка"
          </p>
          <Button 
            onClick={() => handleOpenDialog()} 
            className="mt-4 bg-diary-primary hover:bg-diary-secondary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Новая заметка
          </Button>
        </div>
      )}
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedNote ? "Редактировать заметку" : "Новая заметка"}
            </DialogTitle>
            <DialogDescription>
              {selectedNote
                ? "Отредактируйте свою заметку и нажмите Сохранить"
                : "Создайте новую заметку и нажмите Сохранить"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Заголовок
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок заметки"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Содержание
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержание заметки"
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleSaveNote}
              className="bg-diary-primary hover:bg-diary-secondary"
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesView;
