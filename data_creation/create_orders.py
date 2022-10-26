import csv
import random
import uuid
import inventory
from create_customer import create_customer
from create_shipment import create_shipment

# creates csv and csv writer for order_product.csv
order_product_writer = csv.writer(open('data_creation/csv_files/order_product.csv', 'w', newline=''))
order_product_fieldnames = ['order_ID', 'product_ID', 'servings']


order_product_writer.writerow(['order_product'])
order_product_writer.writerow(order_product_fieldnames)

current_week_orders = []

# calculates total quantity served of each product for the week
def get_total_servings_of_products():
    product_servings = []
    for product in inventory.products:
        num_product_servings = 0
        for item in current_week_orders:
            for i in range(0, len(item)):
                if (item[i]['item'] == product):
                    num_product_servings += item[i]['servings']

        product_servings.append({
            'product': product,
            'total_servings': num_product_servings
        })

    return product_servings

# creates and adds all the items of an order to order_product.csv; ; returns total price of order
def create_order_items(order_id):
    current_order = []
    extras = []

    # ---------------- base (bowl == rice, gyro == pita) ----------------
    base = {
        'item': '',
        'servings': 1
    }

    if (random.choice(inventory.types) == "'Bowl'"):
        base['item'] = random.choice(inventory.rices)
    else:
        base['item'] = inventory.pita[0]

    current_order.append(base)

    # ---------------- protein ----------------
    protein = {
        'item': random.choice(inventory.proteins),
        'servings': 1
    }

    # 15% chance someone orders extra protein
    if (random.randint(1, 100) <= 15):
        extras.append("'Extra Protein'")
        protein['servings'] = 2

    current_order.append(protein)

    # ---------------- toppings ----------------
    toppings = random.sample(inventory.toppings, random.randint(0, 5))
    for topping in toppings:
        current_order.append({
            'item': topping,
            'servings': 1
        })

    # ---------------- dressing ----------------
    dressing = {
        'item': random.choice(inventory.dressings),
        'servings': 1
    }

    # 10% chance someone orders extra dressing
    if (random.randint(1, 100) <= 10):
        extras.append("'Extra Dressing'")
        dressing['servings'] = 2

    current_order.append(dressing)

    # ---------------- sides ----------------
    # 50% chance someone will order a side; can randomly pick between 1 and 3 sides
    if (random.randint(1, 100) <= 50):
        extras.append(random.sample(inventory.sides, random.randint(1, len(inventory.sides))))

    # ---------------- put order together, calculate price, and write to csv ----------------
    for item in current_order:
        order_product_writer.writerow([
            order_id,
            inventory.get_product_id(item['item']),
            item['servings']
        ])

    current_week_orders.append(current_order)

    # always starts at $8.09; additional price comes from extras and sides
    price = 8.09
    for item in extras:
        price += inventory.get_product_price(item)

    return price

# creates 3 weeks of order history and adds them to orders.csv
def create_orders(employees):
    writer = csv.writer(open('data_creation/csv_files/orders.csv', 'w', newline = ''))

    fieldnames = ['order_ID', 'employee_ID', 'customer_ID', 'total_price', 'order_date']

    writer.writerow(['orders'])
    writer.writerow(fieldnames)

    # so that order data will start on the first Monday of September
    current_day = 2

    # Create 3 weeks of orders, 7 days per week, random range of orders per day
    overall_price = 0
    for i in range(0, 3):
        weekly_price = 0
        for j in range(0, 7):
            current_day += 1

            num_orders = random.randint(250, 350)

            # if it's a game day (Saturday of 1st and 2nd week), we want more orders
            if ((i == 0 and j == 5) or (i == 1 and j == 5)):
                num_orders = random.randint(500, 600)

            for k in range(num_orders):
                order_id = "'{}'".format(uuid.uuid1())

                # create an order, writing the products to order_product.csv, and get the total price
                total_price = create_order_items(order_id)
                order = {
                    'order_ID': order_id,
                    # choose a random employee's ID; only servers can be selected
                    'employee_ID': random.choice(employees[1:])['employee_ID'],
                    # creates a customer and writes to customers.csv
                    'customer_ID': create_customer(),
                    'total_price': total_price,
                    'date': "'2022-10-{}'".format(current_day),
                }

                writer.writerow([
                    order['order_ID'],
                    order['employee_ID'],
                    order['customer_ID'],
                    order['total_price'],
                    order['date']
                ])

                weekly_price += total_price

        overall_price += weekly_price

        # gets total servings for each product, resets order history for new week, populates shipment table
        total_servings = get_total_servings_of_products()
        create_shipment(total_servings, "'2022-10-{} 17:30:00'".format(current_day - 1), "'2022-10-{} 06:00:00'".format(current_day + 1), "'2022-10-{} 00:00:00'".format(current_day + 8), employees)

        current_week_orders.clear()

        print('Week {}: ${:.2f}'.format((i + 1), weekly_price))

    print('Total: ${:.2f}'.format(overall_price))
