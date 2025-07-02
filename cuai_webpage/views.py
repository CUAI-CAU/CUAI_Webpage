# landing_page
def landing_page(request): # respond with json, not html
    from django.http import JsonResponse
    return JsonResponse({
        'message': 'Welcome to the CUAI Webpage API',
        'status': '200 OK',
    })
    