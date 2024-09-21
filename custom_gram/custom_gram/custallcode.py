import frappe
@frappe.whitelist()
def set_cost_center(doc, method):
    print("Sales Order event triggered")
    for item in doc.items:
        item.custom_cost_center = doc.cost_center if doc.cost_center else None
    
    for tax in doc.taxes:
        tax.cost_center = doc.cost_center if doc.cost_center else None


@frappe.whitelist()
def set_cost(doc, method):
    
    for item in doc.items:
        item.cost_center = doc.cost_center if doc.cost_center else None

    for tax in doc.taxes:
        tax.cost_center = doc.cost_center if doc.cost_center else None
