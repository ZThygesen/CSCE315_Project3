import csv
import uuid
import inventory

# ------------------- Populating shipment_product.csv -------------------
shipment_product_writer = csv.writer(open('data_creation/csv_files/shipment_product.csv', 'w', newline=''))

shipment_product_fieldnames = ['shipment_ID', 'product_ID', 'ship_quantity', 'expiration_date']

shipment_product_writer.writerow(['shipment_product'])
shipment_product_writer.writerow(shipment_product_fieldnames)

def create_shipment_items(shipment_id, total_servings, expiration):
    shipment_price = 0
    for product in total_servings:
        #print('Before: {}; After: {}'.format(product['total_servings'], round(product['total_servings'] + 200, -2)))
        shipment_price += inventory.get_product_price(product['product']) * product['total_servings'] * 0.5

        shipment_product_writer.writerow([
            shipment_id,
            inventory.get_product_id(product['product']),
            round(product['total_servings'] + 200, -2) *
            inventory.get_serving_size(product['product']),
            expiration
        ])

    return shipment_price


# ------------------- Populating shipments.csv -------------------
shipment_writer = csv.writer(open('data_creation/csv_files/shipments.csv', 'w', newline=''))

shipment_fieldnames = ['shipment_ID', 'vendor', 'purchase_date', 'arrival_date', 'employee_ID', 'ship_price']

shipment_writer.writerow(['shipments'])
shipment_writer.writerow(shipment_fieldnames)

def create_shipment(total_servings, purchase, arrival, expiration, employees):
    shipment_id = "'{}'".format(uuid.uuid1())
    shipment_price = create_shipment_items(shipment_id, total_servings, expiration)

    shipment_writer.writerow([
        shipment_id,
        "'JAZA'",
        purchase,
        arrival,
        employees[0]['employee_ID'],
        '{:.2f}'.format(shipment_price)
    ])
