export const keysDescription = {
    "Transaction ID": "A unique identifier for each transaction or sale.",
    "Date": "The date on which the transaction occurred.",
    "Time": "The time at which the transaction occurred.",
    "Customer ID": "A unique identifier for each customer.",
    "Customer Age": "The age of the customer.",
    "Customer Gender": "The gender of the customer.",
    "Product ID": "A unique identifier for each product.",
    "Product Name":"The name or description of the product.",
    "Category": "The category to which the product belongs (e.g., electronics, clothing, groceries).",
    "Quantity": "The number of units of the product sold in the transaction.",
    "Unit Price": "The price per unit of the product.",
    "Total Price": "The total price for the quantity of products sold in the transaction (Quantity * Unit Price).",
    "Payment Method": "The method of payment used (e.g., cash, credit card, debit card).",
    "Store Location": "The location of the store where the transaction took place.",
    "Discount": "Any discount applied to the transaction.",
    "Salesperson ID": "A unique identifier for the salesperson handling the transaction.",
    "Profit Margin": "The profit margin on the product sold.",
    "Other": "Other",
};
export const option = [
    {value: "Transaction ID", label: "Transaction ID"},
    {value: "Date", label: "Date"},
    {value: "Time", label: "Time"},
    {value: "Customer ID", label: "Customer ID"},
    {value: "Product ID", label: "Product ID"},
    {value: "Product Name", label: "Product Name"},
    {value: "Category", label: "Category"},
    {value: "Quantity", label: "Quantity"},
    {value: "Unit Price", label: "Unit Price"},
    {value: "Total Price", label: "Total Price"},
    {value: "Payment Method", label: "Payment Method"},
    {value: "Store Location", label: "Store Location"},
    {value: "Discount", label: "Discount"},
    {value: "Salesperson ID", label: "Salesperson ID"},
    {value: "Profit Margin", label: "Profit Margin"},
    {value: "Other", label: "Other"},
  ];

export const keysApi = {
    "Transaction ID": "include",
    "Date": "daterange",
    "Time": "range",
    "Customer ID": "include",
    "Customer Age": "range",
    "Customer Gender": "include",
    "Product ID": "include",
    "Product Name":"include",
    "Category": "include",
    "Quantity": "range",
    "Unit Price": "range",
    "Total Price": "range",
    "Payment Method": "include",
    "Store Location": "include",
    "Discount": "include",
    "Salesperson ID": "include",
    "Profit Margin": "range",
    "Other": "Other",
};
export const sampleFields = ['Quantity', 'Total Price', 'Unit Price']
export const rfmClassification = [
    {
        name:'Champions',
        color:'rgb(75, 192, 192)',
    },
    {
        name:'Loyal Customers',
        color:'rgb(54, 162, 235)',
    },
    {
        name:'Potential Loyalist',
        color:'#55b685',
    },
    {
        name:'New Customers',
        color:'rgb(153, 102, 255)',
    },
    {
        name:'Promising',
        color:'rgb(255, 159, 64)',
    },
    {
        name:'Need Attention',
        color:'#e87b35',
    },
    {
        name:'About To Sleep',
        color:'rgb(124, 70, 74)',
    },
    {
        name:'At Risk',
        color:'rgb(255, 99, 132)',
    },
    {
        name:"Can't Lose Them",
        color:'rgb(255, 205, 86)',
    },
    {
        name:'Hibernating',
        color:'#a8b4f6',
    },
];
