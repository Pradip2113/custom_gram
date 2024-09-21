async function update_cost_center(frm, fieldname) {
    if (frm.doc.cost_center) {
        // Update cost center for items
        for (const item of frm.doc.items) {
            const field_to_update = (fieldname === "cost_center") ? 'cost_center' : 'custom_cost_center';
            await frappe.db.set_value(item.doctype, item.name, field_to_update, frm.doc.cost_center);
        }
        // Update cost center for taxes
        for (const tax of frm.doc.taxes) {
            await frappe.db.set_value(tax.doctype, tax.name, 'cost_center', frm.doc.cost_center);
        }
        // Refresh fields after update
        await frm.refresh_field("items");
        await frm.refresh_field("taxes");
    }
}

frappe.ui.form.on('Sales Order', {
    after_save: async function(frm) {
        await update_cost_center(frm, "custom_cost_center");
    }
});

frappe.ui.form.on('Sales Invoice', {
    after_save: async function(frm) {
        await update_cost_center(frm, "cost_center");
    }
});

frappe.ui.form.on('Delivery Note', {
    after_save: async function(frm) {
        await update_cost_center(frm, "cost_center");
    }
});
