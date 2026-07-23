<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMechanicRequest;
use App\Http\Requests\UpdateMechanicRequest;
use App\Models\Mechanic;
use App\Services\MechanicService;
use Inertia\Inertia;
use Inertia\Response;

class MechanicController extends Controller
{
    public function __construct(protected MechanicService $mechanicService)
    {
    }

    /**
     * Display a paginated list of mechanics.
     * Supports search by name or employee ID.
     */
    public function index(): Response
    {
        $mechanics = Mechanic::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('employee_id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Mechanics/Index', [
            'mechanics' => $mechanics,
            'filters' => request()->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Mechanic::class);

        return Inertia::render('Mechanics/Create');
    }

    public function store(StoreMechanicRequest $request)
    {
        $this->authorize('create', Mechanic::class);

        $this->mechanicService->create($request->validated());

        return redirect()->route('mechanics.index')
            ->with('success', 'Mechanic added successfully.');
    }

    public function show(Mechanic $mechanic): Response
    {
        $this->authorize('view', $mechanic);

        return Inertia::render('Mechanics/Show', [
            'mechanic' => $mechanic,
        ]);
    }

    public function edit(Mechanic $mechanic): Response
    {
        $this->authorize('update', $mechanic);

        return Inertia::render('Mechanics/Edit', [
            'mechanic' => $mechanic,
        ]);
    }

    public function update(UpdateMechanicRequest $request, Mechanic $mechanic)
    {
        $this->authorize('update', $mechanic);

        $this->mechanicService->update($mechanic, $request->validated());

        return redirect()->route('mechanics.index')
            ->with('success', 'Mechanic updated successfully.');
    }

    public function destroy(Mechanic $mechanic)
    {
        $this->authorize('delete', $mechanic);

        $this->mechanicService->delete($mechanic);

        return redirect()->route('mechanics.index')
            ->with('success', 'Mechanic deleted successfully.');
    }
}