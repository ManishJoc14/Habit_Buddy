#define CROW_MAIN
#include <crow/crow.h>
#include <crow/app.h>
#include <crow/middlewares/cors.h>
#include <mysqlx/xdevapi.h>
#include <nlohmann/json.hpp>
#include <iostream>
#include <string>
#include <sstream>
#include <fstream>

using namespace mysqlx;
using json = nlohmann::json;

class User
{
public:
    std::string userName;
    std::string userEmail;
    std::string userPassword;

    // REVIEW - constant static strings
    static const std::string URL;
    static const std::string UserNameColumnName;
    static const std::string UserEmailColumnName;
    static const std::string UserPaswordColumnName;
    static const std::string UserNotesColumnName;

    User()
    {
        userName = "Manish";
        userEmail = "Manish Joshi";
        userPassword = "Manish123";
    }

    static Session startSession()
    {
        Session mySession(User::URL);
        return mySession;
    }

    static Table getTable(Session &mySession)
    {

        // NOTE - Accessing a database schema
        Schema myDb = mySession.getSchema("habitbuddydatabase");

        // NOTE - Accessing a table
        Table userDbTable = myDb.getTable("userdatabase");
        return userDbTable;
    }

    static void DeleteAlluserData()
    {
        Session mySession = startSession();
        mySession.sql("DELETE FROM `habitbuddydatabase`.`userdatabase`").execute();
    }

    void insertUserToTable()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Inserting user to database
            userDbTable.insert(User::UserNameColumnName, User::UserEmailColumnName, User::UserPaswordColumnName, User::UserNotesColumnName).values(this->userName, this->userEmail, this->userPassword, R"([{ }])").execute();
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

    void selectUserFromTable()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Select user's row
            RowResult userRow = userDbTable.select("*")
                                    .where("userEmail = :USEREMAIL")
                                    .bind("USEREMAIL", this->userEmail)
                                    .execute();

            // NOTE - Get all data of user
            Row userData = userRow.fetchOne();
            if (userData)
            {
                std::cout << "      userName: " << userData[0] << "\n";
                std::cout << "     userEmail: " << userData[1] << "\n";
                std::cout << "  userPassword: " << userData[2] << "\n";
                std::cout << "     userNotes: " << userData[3] << "\n";
            }
            else
            {
                std::cout << "No matching user found with given id ' " << this->userEmail << " '\n";
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

    void updateUserName()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Inserting to database
            userDbTable.update().set(User::UserNameColumnName, this->userName).execute();
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

    void updateUserEmail()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Inserting to database
            userDbTable.update().set(User::UserEmailColumnName, this->userEmail).execute();
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

    void updateUserPassword()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Inserting to database
            userDbTable.update().set(User::UserPaswordColumnName, this->userPassword).execute();
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

    void deleteUser()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - DELETE USER from database
            userDbTable.remove().where("userEmail = :USEREMAIL AND userName = :USERNAME").bind("USEREMAIL", "").bind("USERNAME", "").execute();
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
};

// REVIEW - constant static strings
const std::string User::URL = "mysqlx://Manish:Manishjoshi123@127.0.0.1:33060";
const std::string User::UserNameColumnName = "userName";
const std::string User::UserEmailColumnName = "userEmail";
const std::string User::UserPaswordColumnName = "userPassword";
const std::string User::UserNotesColumnName = "userNotes";

class NoteManager : public User
{
private:
    json notes;

public:
    NoteManager()
    {
        readNotesFromDatabase();
    }

    json convertNoteToJSON(const mysqlx::Value &note)
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
        ss << "\"priority\": " << note["priority"].get<int>() << ",";
        ss << "\"startDate\": \"" << note["startDate"].get<std::string>() << "\"";
        ss << "}";

        return json::parse(ss.str());
    }

    void readNotesFromDatabase()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - Select user's row
            RowResult userRow = userDbTable.select(User::UserNotesColumnName)
                                    .where("userEmail = :USEREMAIL")
                                    .bind("USEREMAIL", this->userEmail)
                                    .execute();

            // NOTE - Get all Notes of user
            Row Notes = userRow.fetchOne();
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

    json getNotes()
    {
        return notes;
    }

    void displayNotes()
    {
        std::cout << notes.dump(2);
    }

    void saveNotesToDatabase()
    {
        try
        {
            // NOTE - Establishing a connection
            Session mySession = startSession();

            // NOTE - Get Table from database
            Table userDbTable = getTable(mySession);

            // REVIEW - updateNotes in database
            userDbTable.update().set(User::UserNotesColumnName, notes.dump(2)).where("userEmail = :USEREMAIL AND userName = :USERNAME").bind("USEREMAIL", this->userEmail).bind("USERNAME", this->userName).execute();
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

    void addNote(const json &newNote)
    {
        try
        {
            notes.push_back(newNote);
            saveNotesToDatabase();
            std::cout << "NOTE SAVED: " << newNote.dump(2);
        }
        catch (const std::exception &e)
        {
            // Print an error message if an exception occurs
            std::cerr << e.what() << '\n';
        }
    }

    void checkNote(const std::string &id, int done)
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

    void deleteNote(const std::string &id)
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
};

int main()
{
    crow::App<crow::CORSHandler> app;
    NoteManager noteManager;

    // Get a reference to the CORSHandler middleware
    auto &cors = app.get_middleware<crow::CORSHandler>();

    // Set the global CORS rules to allow any origin and method
    cors.global().origin("*");

    // Route to add a new note
    CROW_ROUTE(app, "/addNote")
        .methods("POST"_method)([&noteManager](const crow::request &req)
                                {
            try
            {
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Call the addNote function with the parsed JSON data
                noteManager.addNote(requestData);
                
                // Return a success response
                return crow::response(requestData.dump(2));
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';
               
                // Return an error response
                return crow::response(500, "Internal Server Error");
            } });

    // Route to mark a note as done
    CROW_ROUTE(app, "/checkNote")
        .methods("POST"_method)([&noteManager](const crow::request &req)
                                {
            try
            {
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                int done = requestData["done"];

                // Call the checkNote function with the extracted parameters
                noteManager.checkNote(id, done);
                
                // Return a success response
                return crow::response(id);
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';
                // Return an error response
                return crow::response(500, "Internal Server Error");
            } });

    // Route to delete a note
    CROW_ROUTE(app, "/deleteNote")
        .methods("POST"_method)([&noteManager](const crow::request &req)
                                {
            try
            {
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];

                // Call the deleteNote function with the extracted parameters
                noteManager.deleteNote(id);

                // Return a success response
                return crow::response(id);
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';

                // Return an error response
                return crow::response(500, "Internal Server Error");
            } });

    // Route to view all notes
    CROW_ROUTE(app, "/viewNote")
        .methods("GET"_method)([&noteManager]()
                               {
            try
            {
                // Call the getNotes function to get all notes
                json notes = noteManager.getNotes();

                // Return the notes in the response body
                return crow::response(notes.dump(2));   //dump is just for formatting notes with indentation of 2
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';

                // Return an error response
                return crow::response(500, "Internal Server Error");
            } });
   

    app.port(3001)
        .multithreaded()
        .run();

    return 0;
}