from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from fuzzywuzzy import fuzz
from contacts.models import Contact
from .serializers import ContactSerializer

# Contact Viewset


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.all()


    def perform_create(self, serializer):
        serializer.save()

class Search(generics.GenericAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = ContactSerializer
    def get(self, request):
        str1 = request.GET.get('search')
        contacts = Contact.objects.all()
        res = []
        for contact in contacts:
            if(fuzz.ratio(str1.lower(),contact.name.lower())>80 or fuzz.partial_ratio(str1.lower(),contact.name.lower())>80 or fuzz.token_sort_ratio(str1,contact.name)>80 or fuzz.token_set_ratio(str1,contact.name)>80):
                res.append(contact)
        res = sorted(res,key = lambda contact: fuzz.ratio(str1.lower(),contact.name.lower()) + fuzz.partial_ratio(str1.lower(),contact.name.lower()) + fuzz.token_sort_ratio(str1,contact.name) + fuzz.token_set_ratio(str1,contact.name))
        return Response(ContactSerializer(res,many=True).data)

