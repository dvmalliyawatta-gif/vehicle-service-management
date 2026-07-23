import { useForm } from '@inertiajs/react';

// Reusable form for creating and editing a vehicle.
// "customers" = list of customers for the dropdown selector.
// "vehicle" prop present = editing mode; absent = creating mode.
export default function Form({ vehicle = null, customers }) {
    const isEditing = vehicle !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: vehicle?.customer_id || '',
        registration_no: vehicle?.registration_no || '',
        make: vehicle?.make || '',
        model: vehicle?.model || '',
        year: vehicle?.year || '',
        vin: vehicle?.vin || '',
        mileage: vehicle?.mileage || '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            put(route('vehicles.update', vehicle.id));
        } else {
            post(route('vehicles.store'));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Customer dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Customer</label>
                <select
                    value={data.customer_id}
                    onChange={(e) => setData('customer_id', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">Select a customer...</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                {errors.customer_id && <p className="text-red-600 text-sm mt-1">{errors.customer_id}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Registration No.</label>
                <input
                    type="text"
                    value={data.registration_no}
                    onChange={(e) => setData('registration_no', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.registration_no && <p className="text-red-600 text-sm mt-1">{errors.registration_no}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Make</label>
                <input
                    type="text"
                    value={data.make}
                    onChange={(e) => setData('make', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.make && <p className="text-red-600 text-sm mt-1">{errors.make}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                    type="text"
                    value={data.model}
                    onChange={(e) => setData('model', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.model && <p className="text-red-600 text-sm mt-1">{errors.model}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                    type="number"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">VIN</label>
                <input
                    type="text"
                    value={data.vin}
                    onChange={(e) => setData('vin', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.vin && <p className="text-red-600 text-sm mt-1">{errors.vin}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                <input
                    type="number"
                    value={data.mileage}
                    onChange={(e) => setData('mileage', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.mileage && <p className="text-red-600 text-sm mt-1">{errors.mileage}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {processing ? 'Saving...' : isEditing ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
        </form>
    );
}