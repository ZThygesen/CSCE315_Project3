import csv
import uuid

# creates all the employees and returns a list of them and their attributes
def create_employees():
    writer = csv.writer(open('data_creation/csv_files/employees.csv', 'w', newline = ''))

    fieldnames = ['employee_ID', 'firstName', 'lastName', 'DOB', 'address', 'phone_number', 'position']

    writer.writerow(['employees'])
    writer.writerow(fieldnames)

    employees = [
        {'employee_ID': "'{}'".format(uuid.uuid1()), 'firstName': "'Adam'", 'lastName': "'Pinto'", 'DOB': "'2000-01-02'",
        'address': "'123 Add Ln'", 'phone_number': '1234567890', 'position': "'Manager'"},
        {'employee_ID': "'{}'".format(uuid.uuid1()), 'firstName': "'Ardian'", 'lastName': "'Kuswanto'",
        'DOB': "'2001-02-03'", 'address': "'456 Sub St'", 'phone_number': '1002003000', 'position': "'Server'"},
        {'employee_ID': "'{}'".format(uuid.uuid1()), 'firstName': "'Justin'", 'lastName': "'Heger'",
        'DOB': "'2002-03-04'", 'address': "'789 Mul Rd'", 'phone_number': '3002001000', 'position': "'Server'"},
        {'employee_ID': "'{}'".format(uuid.uuid1()), 'firstName': "'Zach'", 'lastName': "'Thygesen'",
        'DOB': "'2003-04-05'", 'address': "'101 Div Dr'", 'phone_number': '1231231234', 'position': "'Server'"}
    ]

    for employee in employees:
        writer.writerow([
            employee['employee_ID'],
            employee['firstName'],
            employee['lastName'],
            employee['DOB'],
            employee['address'],
            employee['phone_number'],
            employee['position']
        ])

    return employees
