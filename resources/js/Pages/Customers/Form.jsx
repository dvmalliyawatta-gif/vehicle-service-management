import { useForm } from '@inertiajs/react';

// Reusable form for both creating and editing a customer.
// If "customer" prop is provided, we're editing; otherwise, creating.
export default function Form({ customer = null }) {
    const isEditing = customer !== null;

    // useForm gives us form state, validation errors, and submit helpers
    const { data, setData, post, put, processing, errors } = useForm({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: customer?.address || '',
        notes: customer?.notes || '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            // PUT request to update the existing customer
            put(route('customers.update', customer.id));
        } else {
            // POST request to create a new customer
            post(route('customers.store'));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {/* Show validation error if one exists for this field */}
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone field */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Address field (optional) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={2}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Notes field (optional) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={2}
                />
                {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes}</p>}
            </div>

            {/* Submit button — text changes depending on create vs edit */}
            <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {processing ? 'Saving...' : isEditing ? 'Update Customer' : 'Create Customer'}
            </button>
        </form>
    );
}