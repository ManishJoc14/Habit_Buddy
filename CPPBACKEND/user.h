#pragma once
// In C++, header guards (or include guards) are used to prevent the same header file from being included multiple times in a translation unit, which can cause compilation errors due to redefinitions.

#include <mysqlx/xdevapi.h>
#include <nlohmann/json.hpp>
#include <iostream>
#include <string>

using namespace mysqlx;
using json = nlohmann::json;

class User
{
public:
    std::string userName;
    std::string userEmail;
    std::string userPassword;

    static const std::string URL;
    static const std::string SchemaName;
    static const std::string TableName;
    static const std::string UserNameColumnName;
    static const std::string UserEmailColumnName;
    static const std::string UserPaswordColumnName;
    static const std::string UserNotesColumnName;
    static const std::string UserHabitsColumnName;

    User();
    User(std::string name, std::string email, std::string password);
    json getUserDetails();
    static Session startSession();
    static Table getTable(Session &mySession);
    static void DeleteAlluserData();
    void insertUserToTable();
    Row selectUserFromTable();
    void changeUserDetails(std::string newName, std::string newEmail, std::string newPassword);
    void deleteUser();
};
