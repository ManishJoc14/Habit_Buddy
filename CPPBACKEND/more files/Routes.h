#pragma once
#include <crow.h>
#include <nlohmann/json.hpp>
#include "User.h"
#include "NoteManager.h"

using json = nlohmann::json;

// Function declaration to include routes in the provided Crow app
void includeRoutes(crow::App &app);
