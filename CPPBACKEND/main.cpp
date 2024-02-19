#include "User.h"
#include "NoteManager.h"
#include "HabitManager.h"

#include <crow.h>
#include <crow/app.h>
#include <crow/middlewares/cors.h>
#include <nlohmann/json.hpp>

#include <iostream>
#include <string>

using json = nlohmann::json;

int main()
{
    crow::App<crow::CORSHandler> app;

    // Get a reference to the CORSHandler middleware
    auto &cors = app.get_middleware<crow::CORSHandler>();

    // Set the global CORS rules to allow any origin and method
    cors.global().origin("*");

    // Route to signup
    CROW_ROUTE(app, "/signup")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                std::string name = requestData["name"];
                std::string email = requestData["email"];
                std::string password = requestData["password"];
                User user(name, email, password);

                // user.setUser(requestData);
                json data =  user.getUserDetails();
                
                // Return a success response
                return crow::response(data.dump(2));
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';
               
                // Return an error response
                return crow::response(500, "internal server error");
            } });

    // Route to change user details
    CROW_ROUTE(app, "/changeDetails")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");
                
                User user(name, email, password);
                   
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                std::string newName = requestData["newName"];
                std::string newEmail = requestData["newEmail"];
                std::string newPassword = requestData["newPassword"];


                user.changeUserDetails(newName, newEmail, newPassword);
               
                json data =  user.getUserDetails();
                
                // Return a success response
                return crow::response(data.dump(2));
            }
            catch (const std::exception &e)
            {
                // Print an error message if an exception occurs
                std::cerr << e.what() << '\n';
               
                // Return an error response
                return crow::response(500, "internal server error");
            } });

    // Route to add a new note
    CROW_ROUTE(app, "/addNote")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                std::cout << name << email << password;
                // User user(name, email, password);
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);
                NoteManager noteManager(name, email, password);

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

    // Route to add a new habit
    CROW_ROUTE(app, "/addHabit")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                std::cout << name << email << password;
               
                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);
                HabitManager habitManager(name, email, password);

                // Call the addHabit function with the parsed JSON data
                habitManager.addHabit(requestData);

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

    // Route to edit note
    CROW_ROUTE(app, "/editNote")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // User user(name, email, password);

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);
                NoteManager noteManager(name, email, password);

                // Call the editNote function with the parsed JSON data
                noteManager.editNote(requestData);

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

    // Route to edit habit
    CROW_ROUTE(app, "/editHabit")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);
                HabitManager habitManager(name, email, password);

                // Call the editHabit function with the parsed JSON data
                habitManager.editHabit(requestData);

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
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // User user(name, email, password);

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                int done = requestData["done"];
                NoteManager noteManager(name, email, password);

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

    // Route to mark a habit as done
    CROW_ROUTE(app, "/checkHabit")
        .methods("POST"_method)([](const crow::request &req)
                                {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                int done = requestData["done"];
                HabitManager habitManager(name, email, password);

                // Call the checkHabit function with the extracted parameters
                habitManager.checkHabit(id, done);

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
        .methods("DELETE"_method)([](const crow::request &req)
                                  {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // User user(name, email, password);

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                NoteManager noteManager(name, email, password);

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

    // Route to delete a habit
    CROW_ROUTE(app, "/deleteHabit")
        .methods("DELETE"_method)([](const crow::request &req)
                                  {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // Parse JSON data from the request body
                json requestData = json::parse(req.body);
                // std::cout << requestData.dump(2);

                // Extract parameters from the parsed JSON data
                std::string id = requestData["id"];
                HabitManager habitManager(name, email, password);

                // Call the deleteHabit function with the extracted parameters
                habitManager.deleteHabit(id);

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
        .methods("GET"_method)([](const crow::request &req)
                               {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // User user(name, email, password);
                NoteManager noteManager(name, email, password);

                // Call the getNotes function to get all notes
                json notes = noteManager.getNotes();
                // std::cout <<  "Notes::   :::  "<< notes.dump(2);

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

    // Route to view all habits
    CROW_ROUTE(app, "/viewHabit")
        .methods("GET"_method)([](const crow::request &req)
                               {
            try
            {
                 // Extract email and password from request headers
                std::string name = req.get_header_value("name");
                std::string email = req.get_header_value("email");
                std::string password = req.get_header_value("password");

                // User user(name, email, password);
                HabitManager habitManager(name, email, password);

                // Call the getHabits function to get all habits
                json habits = habitManager.getHabits();
                // std::cout <<  "Habits::   :::  "<< habits.dump(2);

                // Return the habits in the response body
                return crow::response(habits.dump(2));   //dump is just for formatting notes with indentation of 2
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