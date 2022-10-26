import csv
import uuid

types = ["'Bowl'", "'Gyro'"]
rices = ["'Brown Rice'", "'Rice Pilaf'"]
proteins = ["'Butter Chicken'", "'Beef'", "'Falafel'", "'Veggie Medley'"]
toppings = ["'Onions'", "'Diced Tomatoes'", "'Tomato and Onion'", "'Olives'", "'Cucumbers'", "'Cabbage'", "'Couscous'", "'Hummus'", "'Red Pepper Hummus'"]
dressings = ["'Jalapeno Feta'", "'Tzaziki'", "'Spicy Tzaziki'", "'Harissa Yogurt'", "'Spicy Harissa'", "'Lemon Dill Yogurt'", "'Greek Pomegranate Vinaigrette'"]
sides = ["'Hummus & Pita'", "'2 Falafels'", "'Fountain Drink'"]

products = types + rices + proteins + toppings + dressings + sides

inventory = []

def create_inventory():
    writer = csv.writer(open('data_creation/csv_files/inventory.csv', 'w', newline = ''))

    fieldnames = ['product_ID', 'product_name', 'product_type', 'price', 'total_quantity']

    writer.writerow(['inventory'])
    writer.writerow(fieldnames)

    for product in products:
        item = {
            'product_ID': "'{}'".format(uuid.uuid1()),
            'product_name': product,
            'product_type': get_product_type(product),
            'price': get_product_price(product),
            'total_quantity': get_initial_quantity(product) * get_serving_size(product)
        }

        inventory.append(item)

        writer.writerow([
            item['product_ID'],
            item['product_name'],
            item['product_type'],
            item['price'],
            item['total_quantity']
        ])

def get_initial_quantity(product):
    if (product in rices):
        return 800
    elif (product in proteins):
        return 800
    elif (product in toppings):
        return 600
    elif (product in dressings):
        return 500
    elif (product in types):
        return 1400
    else:
        return 300

# serving size in ounces
def get_serving_size(product):
    if (product in rices):
        return 6
    elif (product in proteins):
        return 3
    elif (product in toppings):
        return 0.75
    elif (product in dressings):
        return 3
    elif (product in types):
        return 3
    else:
        return 1

def get_product_id(item):
    for product in inventory:
        if (product['product_name'] == item):
            return product['product_ID']

def get_product_type(product):
    if (product in rices):
        return "'Rice'"
    elif (product in proteins):
        return "'Protein'"
    elif (product in toppings):
        return "'Topping'"
    elif (product in dressings):
        return "'Dressing'"
    elif (product in types):
        return "'Type'"
    else:
        return "'Side'"


def get_product_price(product):
    if (product in proteins):
        return 8.09
    elif (product == "'Hummus & Pita'"):
        return 3.49
    elif (product == "'2 Falafels'"):
        return 3.49
    elif (product == "'Extra Protein'"):
        return 1.99
    elif (product == "'Extra Dressing'"):
        return 0.39
    elif (product == "'Fountain Drink'"):
        return 2.45
    else:
        return 0

create_inventory()
