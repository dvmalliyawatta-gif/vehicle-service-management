import { useForm } from '@inertiajs/react';

// Reusable form for creating and editing a mechanic.
export default function Form({ mechanic = null }) {
    const isEditing = mechanic !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        name: mechanic?.name || '',
        employee_id: mechanic?.employee_id || '',
        specialization: mechanic?.specialization || '',
        contact: mechanic?.contact || '',
        address: mechanic?.address || '',
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            put(route('mechanics.update', mechanic.id));
        } else {
            post(route('mechanics.store'));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input
                    type="text"
                    value={data.employee_id}
                    onChange={(e) => setData('employee_id', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.employee_id && <p className="text-red-600 text-sm mt-1">{errors.employee_id}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input
                    type="text"
                    value={data.specialization}
                    onChange={(e) => setData('specialization', e.target.value)}
                    placeholder="e.g. Engine, Electrical, Brakes"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.specialization && <p className="text-red-600 text-sm mt-1">{errors.specialization}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                    type="text"
                    value={data.contact}
                    onChange={(e) => setData('contact', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
            </div>

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

            <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {processing ? 'Saving...' : isEditing ? 'Update Mechanic' : 'Add Mechanic'}
            </button>
        </form>
    );
}