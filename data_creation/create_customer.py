import csv
import random
import uuid

writer = csv.writer(open('data_creation/csv_files/customers.csv', 'w', newline=''))

fieldnames = ['customer_ID', 'firstName', 'lastName']

writer.writerow(['customers'])
writer.writerow(fieldnames)

# creates a customer, writes to csv file, returns id of customer
def create_customer():
    first_names = ["'Carter'", "'Anthony'", "'Jennifer'", "'Stacy'",
                    "'Tony'", "'Mary'", "'Eric'", "'Lori'", "'Roy'", "'Amanda'"]
    last_names = ["'Jenkins'", "'Rodriguez'", "'Thompson'", "'Clark'",
                    "'Banks'", "'Robertson'", "'Jefferson'", "'Brown'", "'Quinn'", "'Gibson'"]

    customer = {
        'customer_ID': "'{}'".format(uuid.uuid1()),
        'firstName': random.choice(first_names),
        'lastName': random.choice(last_names)
    }

    writer.writerow([
        customer['customer_ID'],
        customer['firstName'],
        customer['lastName']
    ])

    return customer['customer_ID']
