<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Todo::where('user_id', auth()->user()->id)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // data will be the correct request data if it passed the validation
        $data = $request->validate([
            'title' => 'required|string',
            'completed' => 'required|boolean'
        ]);
        $todo = Todo::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'completed' => $request->completed
        ]);
        return response($todo, 201);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        //
        if ($todo->user_id !== auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }
        $data = $request->validate([
            'title' => 'required|string',
            'completed' => 'required|boolean'
        ]);
        $todo->update($data);
        return response($todo, 200);
    }

    public function updateAll(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'completed' => 'required|boolean'
        ]);
        // update all!
        Todo::where('user_id', auth()->user()->id)->update($data);
        return response('Updated', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        //
        if ($todo->user_id !== auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }
        $todo->delete();
        return response('Deleted todo item', 200);
    }

    public function destroyCompleted(Request $request)
    {
        //

        $todosToDelete = $request->todos;
        $userTodoIds = auth()->user()->todos->map(function ($todo) {
            return $todo->id;
        });
        $valid = collect($todosToDelete)->every(function ($value, $key) use ($userTodoIds) {
            return $userTodoIds->contains($value);
        });
        if (!$valid) {
            return response()->json('Unauthorized', 401);
        }
        $request->validate([
            'todos' => 'required|array'
        ]);
        // laravel destroy([1, 2, 3]) :  delete rows with id 1, 2, 3
        Todo::destroy($request->todos);
        return response('Deleted Completed items', 200);
    }
}
