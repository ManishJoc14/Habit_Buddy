@echo off

set PROJECT_PATH=C:\Users\manis\OneDrive\Desktop\Habit-Buddy\CPPBACKEND
set BUILD_PATH=%PROJECT_PATH%\build
set EXECUTABLE_PATH=%BUILD_PATH%\Debug\CPPBACKEND.exe

echo Building the project...
cd %BUILD_PATH%
cmake --build . --config Debug

if %errorlevel% neq 0 goto BuildError

echo Running the executable...
cd %PROJECT_PATH%
%EXECUTABLE_PATH%
goto :EOF

:BuildError
echo Build failed. Check the error messages above.
pause
