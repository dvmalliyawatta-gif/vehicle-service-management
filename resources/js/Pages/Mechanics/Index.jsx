import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Lists mechanics with search + pagination.
export default function Index({ mechanics, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // only Admin sees Add/Edit/Delete — Advisor is view-only per MechanicPolicy
    const roles = usePage().props.auth.roles;
    const isAdmin = roles.includes('admin');

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('mechanics.index'), { search }, { preserveState: true });
    }

    function handleDelete(mechanicId) {
        if (confirm('Are you sure you want to delete this mechanic? This cannot be undone.')) {
            router.delete(route('mechanics.destroy', mechanicId));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mechanics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Mechanics</h1>

                            {/* Only Admin can add mechanics */}
                            {isAdmin && (
                                <Link
                                    href={route('mechanics.create')}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    + Add Mechanic
                                </Link>
                            )}
                        </div>

                        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or employee ID..."
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
                                    <th className="py-2 px-3">Employee ID</th>
                                    <th className="py-2 px-3">Specialization</th>
                                    <th className="py-2 px-3">Contact</th>
                                    {isAdmin && <th className="py-2 px-3">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {mechanics.data.map((mechanic) => (
                                    <tr key={mechanic.id} className="border-b border-gray-100">
                                        <td className="py-2 px-3">
                                            <Link
                                                href={route('mechanics.show', mechanic.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {mechanic.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-3">{mechanic.employee_id}</td>
                                        <td className="py-2 px-3">{mechanic.specialization || '—'}</td>
                                        <td className="py-2 px-3">{mechanic.contact}</td>
                                        {isAdmin && (
                                            <td className="py-2 px-3 space-x-2">
                                                <Link
                                                    href={route('mechanics.edit', mechanic.id)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(mechanic.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}

                                {mechanics.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-4 px-3 text-center text-gray-500">
                                            No mechanics found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="mt-4 flex gap-2">
                            {mechanics.links.map((link, index) => (
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