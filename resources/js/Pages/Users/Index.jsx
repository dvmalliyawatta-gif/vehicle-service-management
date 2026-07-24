import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // current logged-in user's id — needed to hide the Delete button on their own row
    const currentUserId = usePage().props.auth.user.id;

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('users.index'), { search }, { preserveState: true });
    }

    function handleDelete(userId) {
        if (confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            router.delete(route('users.destroy', userId));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
                            <Link
                                href={route('users.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add User
                            </Link>
                        </div>

                        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm"
                            />
                            <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                                Search
                            </button>
                        </form>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-2 px-3">Name</th>
                                    <th className="py-2 px-3">Email</th>
                                    <th className="py-2 px-3">Role</th>
                                    <th className="py-2 px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100">
                                        <td className="py-2 px-3">{user.name}</td>
                                        <td className="py-2 px-3">{user.email}</td>
                                        <td className="py-2 px-3">
                                            {/* roles is an array from Spatie; we show the first (only) one */}
                                            <span className="bg-gray-100 px-2 py-1 rounded text-sm capitalize">
                                                {user.roles[0]?.name.replace('-', ' ') || 'No role'}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 space-x-2">
                                            <Link
                                                href={route('users.edit', user.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            {/* hide Delete button on your own row — server also enforces this via Policy */}
                                            {user.id !== currentUserId && (
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-4 px-3 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {users.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        link.active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}