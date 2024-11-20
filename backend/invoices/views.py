from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoicePagination(PageNumberPagination):
    page_size = 5

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.prefetch_related('details').all()
    serializer_class = InvoiceSerializer
    pagination_class = InvoicePagination
