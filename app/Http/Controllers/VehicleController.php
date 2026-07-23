<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(protected VehicleService $vehicleService)
    {
    }

    /**
     * Display a paginated list of vehicles.
     * Supports search by registration number or VIN.
     */
    public function index(): Response
    {
        $vehicles = Vehicle::query()
            // eager load the owning customer so we can show their name
            // without triggering extra queries per row (N+1 problem)
            ->with('customer')
            ->when(request('search'), function ($query, $search) {
                $query->where('registration_no', 'like', "%{$search}%")
                      ->orWhere('vin', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new vehicle.
     * We pass the customer list so the form can show a dropdown selector.
     */
    public function create(): Response
    {
        $this->authorize('create', Vehicle::class);

        return Inertia::render('Vehicles/Create', [
            'customers' => Customer::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreVehicleRequest $request)
    {
        $this->authorize('create', Vehicle::class);

        $this->vehicleService->create($request->validated());

        return redirect()->route('vehicles.index')
            ->with('success', 'Vehicle added successfully.');
    }

    public function show(Vehicle $vehicle): Response
    {
        $this->authorize('view', $vehicle);

        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle->load('customer'),
        ]);
    }

    public function edit(Vehicle $vehicle): Response
    {
        $this->authorize('update', $vehicle);

        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'customers' => Customer::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $this->authorize('update', $vehicle);

        $this->vehicleService->update($vehicle, $request->validated());

        return redirect()->route('vehicles.index')
            ->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $this->authorize('delete', $vehicle);

        $this->vehicleService->delete($vehicle);

        return redirect()->route('vehicles.index')
            ->with('success', 'Vehicle deleted successfully.');
    }
}