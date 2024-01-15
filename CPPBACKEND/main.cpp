#define CROW_MAIN
#include <crow/crow.h>
#include <crow/app.h>
#include <crow/nlohmanjson.hpp>
#include <crow/middlewares/cors.h>
#include <iostream>
#include <fstream>


using json = nlohmann::json;

class NoteManager
{
private:
    json notes;

public:
    // Constructor to read notes from a JSON file
    NoteManager()
    {
        readFromFile();
    }

    // Function to read notes from a JSON file
    void readFromFile()
    {
        // Open the file for reading
        std::ifstream file("./notes.json");
        if (file.is_open())
        {
            // Check if the file is not empty
            if (file.peek() != std::ifstream::traits_type::eof())
            {
                // Read JSON data from the file
                file >> notes;
            }
            else
            {
                // Print a message if the file is empty
                std::cerr << "File is empty." << std::endl;
            }
            // Close the file
            file.close();
        }
        else
        {
            // Print an error message if the file cannot be opened
            std::cerr << "Error opening file: " << std::endl;
        }
    }

    // Function to add a new note and save to file
    void addNote(const json &newNote)
    {
        try
        {
            // Add the new note
            notes.push_back(newNote);
            // Save the updated notes
            saveToFile();
            // Print the details of the added note
            std::cout << newNote.dump(2);
        }
        catch (const std::exception &e)
        {
            // Print an error message if an exception occurs
            std::cerr << e.what() << '\n';
        }
    }

    // Function to mark a note as done based on its ID
    void checkNote(const std::string &id, bool done)
    {
        // Iterate over notes to find the note with the specified ID
        for (auto &note : notes)
        {
            if (note["id"] == id)
            {
                // Update the "done" field for the found note
                note["done"] = !done;
                // Save the updated notes to the file
                saveToFile();
                // Exit the loop after updating
                break;
            }
        }
    }

    // Function to delete a note based on its ID
    void deleteNote(const std::string &id)
    {
        // Remove the note with the specified ID from the notes
        notes.erase(std::remove_if(notes.begin(), notes.end(),
                                   [&id](const json &note)
                                   { return note["id"] == id; }),
                    notes.end());
        // Save the updated notes to the file
        saveToFile();
        // Print a message indicating the deletion
        std::cout << "Note with ID " << id << " deleted\n";
    }

    // Function to get the current notes
    json getNotes() const
    {
        return notes;
    }

    // Function to save the notes to a file
    void saveToFile()
    {
        // Open the file for writing
        std::ofstream file("./notes.json");
        if (file.is_open())
        {
            // Write the notes to the file in a pretty-printed format
            file << notes.dump(2);
            // Close the file
            file.close();
        }
        else
        {
            // Print an error message if the file cannot be opened for writing
            std::cerr << "Error opening file for writing." << std::endl;
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

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                bool done = requestData["done"];

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

    //
    // Route to delete a note
    CROW_ROUTE(app, "/deleteNote")
        .methods("POST"_method)([&noteManager](const crow::request &req)
                                {
            try
            {
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);

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
                // Call the getNotes function to retrieve all notes
                json notes = noteManager.getNotes();
                
                // Return the notes in the response body
                // std::cout << notes.dump(2);
                return crow::response(notes.dump(2));
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';
                // Return an error response
                return crow::response(500, "Internal Server Error");
            } });

    // Set the port, set the app to run on multiple threads, and run the app
    app.port(3001).multithreaded().run();

    return 0;
}
