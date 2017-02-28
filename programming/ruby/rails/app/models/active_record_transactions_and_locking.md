## Differences between transactions and locking
[link](https://makandracards.com/makandra/31937-differences-between-transactions-and-locking)

Bad:

    def copy_invoice(original)
      duplicate = Invoice.create!(original.recipient)
        original.items.each do |item|
            duplicate.items.create!(article: item.article, amount: item.amount)
        end
      end
    end

- If one of the items fails to create, an incomplete `Invoice` copy will remain in the database.
- If another thread or process fetches invoices before `copy_invoice` has terminated, it will see an incomplete invoice.

Better:

    def copy_invoice(original)
      Invoice.transaction do
        duplicate = Invoice.create!(original.recipient)
          original.items.each do |item|
              duplicate.items.create!(article: item.article, amount: item.amount)
          end
        end
      end
    end

- All AR transactions delegate to the current thread's database connection (doesn't matter what context we called it from).
- Other threads or processes will not see an incomplete copy until `copy_invoice` has terminated.
- The copy of the invoice either occurs as a whole, or not at all.
