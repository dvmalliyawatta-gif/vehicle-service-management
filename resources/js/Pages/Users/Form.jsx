import { useForm } from '@inertiajs/react';

// Reusable form for creating and editing a user.
// "user" prop present = editing mode; absent = creating mode.
export default function Form({ user = null }) {
    const isEditing = user !== null;

    // if editing, pre-fill the current role; roles[0] because Spatie stores it as an array
    const currentRole = user?.roles?.[0]?.name || '';

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: currentRole,
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            put(route('users.update', user.id));
        } else {
            post(route('users.store'));
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
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password {isEditing && <span className="text-gray-400">(leave blank to keep current password)</span>}
                </label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">Select a role...</option>
                    <option value="admin">Admin</option>
                    <option value="service-advisor">Service Advisor</option>
                    <option value="mechanic">Mechanic</option>
                </select>
                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {processing ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
}