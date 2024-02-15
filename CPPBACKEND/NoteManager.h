#pragma once
#include "User.h"
#include <nlohmann/json.hpp>

using namespace mysqlx;
using json = nlohmann::json;

class NoteManager : public User
{
private:
    json notes;

public:
    NoteManager();
    NoteManager(std::string name, std::string email, std::string password);
    json convertNoteToJSON(const mysqlx::Value &note);
    void readNotesFromDatabase();
    json getNotes();
    void displayNotes();
    void saveNotesToDatabase();
    void addNote(const json &newNote);
    void editNote(const json &newNote);
    void checkNote(const std::string &id, int done);
    void deleteNote(const std::string &id);
};
