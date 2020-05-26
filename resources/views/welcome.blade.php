<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>window.Laravel = {csrfToken: '{{csrf_token()}}'}</script>

        <title>Vue-Laravel Todo App</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">


    </head>
    <body>
       <div id="app">
        {{-- <example-component></example-component> --}}
       </div>
       <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
