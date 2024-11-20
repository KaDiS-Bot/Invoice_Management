from rest_framework import serializers
from .models import Invoice, InvoiceDetail

class InvoiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceDetail
        fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']
        read_only_fields = ['line_total']


class InvoiceSerializer(serializers.ModelSerializer):
    details = InvoiceDetailSerializer(many=True)

    class Meta:
        model = Invoice
        fields = ['id', 'invoice_number', 'customer_name', 'date', 'total_amount', 'details']
        read_only_fields = ['total_amount']

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        invoice = Invoice.objects.create(**validated_data)

        # Calculate total_amount
        total_amount = 0
        for detail_data in details_data:
            detail_data['invoice'] = invoice
            detail = InvoiceDetail.objects.create(**detail_data)
            total_amount += detail.line_total

        invoice.total_amount = total_amount
        invoice.save()
        return invoice

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details')
        instance.invoice_number = validated_data.get('invoice_number', instance.invoice_number)
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.date = validated_data.get('date', instance.date)
        instance.save()

        # Update related invoice details
        instance.details.all().delete()
        total_amount = 0
        for detail_data in details_data:
            detail_data['invoice'] = instance
            detail = InvoiceDetail.objects.create(**detail_data)
            total_amount += detail.line_total

        instance.total_amount = total_amount
        instance.save()
        return instance
