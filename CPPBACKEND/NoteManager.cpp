#include "NoteManager.h"
using namespace mysqlx;
using json = nlohmann::json;

NoteManager::NoteManager() : User()
{
    std::cout << " Notemanager Default constuctor\n";
    readNotesFromDatabase();
}

NoteManager::NoteManager(std::string name, std::string email, std::string password) : User(name, email, password)
{
    std::cout << " Notemanager Parameterized constuctor\n";
    readNotesFromDatabase();
}

json NoteManager::convertNoteToJSON(const mysqlx::Value &note)
{
    if (note.getType() != mysqlx::Value::Type::DOCUMENT)
    {
        throw std::invalid_argument("Expected a DOCUMENT type");
    }

    std::stringstream ss;
    ss << "{";
    ss << "\"category\": \"" << note["category"].get<std::string>() << "\",";
    ss << "\"description\": \"" << note["description"].get<std::string>() << "\",";
    ss << "\"done\": " << note["done"].get<int>() << ",";
    ss << "\"endDate\": \"" << note["endDate"].get<std::string>() << "\",";
    ss << "\"id\": \"" << note["id"].get<std::string>() << "\",";
    ss << "\"note\": \"" << note["note"].get<std::string>() << "\",";
    ss << "\"priority\": " << note["priority"] << ",";
    ss << "\"startDate\": \"" << note["startDate"].get<std::string>() << "\"";
    ss << "}";

    return json::parse(ss.str());
}
void NoteManager::readNotesFromDatabase()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - Select user's row
        RowResult userRow = userDbTable.select(User::UserNotesColumnName)
                                .where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD")
                                .bind("USEREMAIL", this->userEmail)
                                .bind("USERNAME", this->userName)
                                .bind("USERPASSWORD", this->userPassword)
                                .execute();

        // NOTE - Get all Notes of user
        Row Notes = userRow.fetchOne();
        if (!Notes)
        {
            std::cout << "No matching user found with given credientials '"
                      << "'\n";
        }
        // std::cout << Notes[0].getType();   // this will give 9

        if (Notes[0].getType() == mysqlx::Value::Type::ARRAY)
        {
            mysqlx::Value ArrayOfNotesObj = Notes[0];
            for (auto note : ArrayOfNotesObj)
            {
                if (note.getType() == mysqlx::Value::Type::DOCUMENT)
                {

                    json noteJson = convertNoteToJSON(note);
                    notes.push_back(noteJson);
                }
            }
        }
        else if (Notes[0].getType() == mysqlx::Value::Type::DOCUMENT)
        {
            json noteJson = convertNoteToJSON(Notes[0]);
            notes.push_back(noteJson);
        }
        else
        {
            std::cout << "Expected value of column of a array type or document type. ";
        }
    }
    catch (const mysqlx::Error &err)
    {
        std::cerr << "MySQL X DevAPI Server Error: " << err << std::endl;
    }
    catch (const std::exception &ex)
    {
        std::cerr << "Standard Exception: " << ex.what() << std::endl;
    }
}
json NoteManager::getNotes()
{
    return notes;
}

void NoteManager::displayNotes()
{
    std::cout << notes.dump(2);
}

void NoteManager::saveNotesToDatabase()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - updateNotes in database
        userDbTable.update().set(User::UserNotesColumnName, notes.dump(2)).where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD").bind("USEREMAIL", this->userEmail).bind("USERNAME", this->userName).bind("USERPASSWORD", this->userPassword).execute();
    }
    catch (const mysqlx::Error &err)
    {
        std::cerr << "MySQL X DevAPI Server Error: " << err << std::endl;
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << std::endl;
    }
}

void NoteManager::addNote(const json &newNote)
{
    try
    {
        notes.push_back(newNote);
        saveNotesToDatabase();
        // std::cout << "NOTE SAVED: " << newNote.dump(2);
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void NoteManager::editNote(const json &newNote)
{
    try
    {
        // id will be same
        std::string id = newNote["id"];
        ;

        // Iterate over notes to find the note with the specified ID
        for (auto &note : notes)
        {
            if (note["id"] == id)
            {
                // update fields values
                note["category"] = newNote["category"];
                note["description"] = newNote["description"];
                note["done"] = newNote["done"];
                note["endDate"] = newNote["endDate"];
                note["note"] = newNote["note"];
                note["endDate"] = newNote["endDate"];
                note["priority"] = newNote["priority"];
                note["startDate"] = newNote["startDate"];

                // Save the updated notes to the database
                saveNotesToDatabase();

                // Exit the loop after updating
                break;
            }
        }
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void NoteManager::checkNote(const std::string &id, int done)
{
    try
    {
        // Iterate over notes to find the note with the specified ID
        for (auto &note : notes)
        {
            if (note["id"] == id)
            {
                // Update the "done" field for the found note
                if (done == 1)
                {
                    note["done"] = 0;
                }

                if (done == 0)
                {
                    note["done"] = 1;
                }

                // Save the updated notes to the database
                saveNotesToDatabase();

                // Exit the loop after updating
                break;
            }
        }
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void NoteManager::deleteNote(const std::string &id)
{
    try
    {
        // Remove the note with the specified ID from the notes
        notes.erase(std::remove_if(notes.begin(), notes.end(),
                                   [&id](const json &note)
                                   { return note["id"] == id; }),
                    notes.end());

        // Save the updated notes to the database
        saveNotesToDatabase();

        // Print a message indicating the deletion
        std::cout << "Note with ID " << id << " deleted\n";
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}