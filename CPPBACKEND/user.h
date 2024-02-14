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