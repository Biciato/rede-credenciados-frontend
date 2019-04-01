import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Endereco } from '../../models/endereco';
import { AddressService } from './address.service';

describe('AddressService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let addressService: AddressService;
    const expectedAddress = {
        cep: '11111-111',
        rua: 'Teste',
        numero: 111,
        complemento: '',
        bairro: 'Teste',
        cidade: 'Teste',
        estado: 'TS'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [ HttpClientTestingModule ],
            // Provide the service-under-test and its dependencies
            providers: [
                AddressService
            ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        addressService = TestBed.get(AddressService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    /// AddressService method tests begin ///

    describe('#register', () => {

        it('should return expected address (called once) after post', () => {

            addressService.register({ tipo_pessoa: 'pessoa_fisica'}).subscribe(
                atividades => expect(atividades).toEqual(expectedAddress, 'should return expected atividades'),
                fail
            );

            // AddressService should have made one request to POST address from expected URL
            const req = httpTestingController.expectOne(addressService.baseUrl + '/register-endereco-pf');
            expect(req.request.method).toEqual('POST');

            // Respond with the mock address
            req.flush(expectedAddress);
        });
    });

    describe('#get', () => {
        it('should return expected address (called once)', () => {

            addressService.get(1, 'pessoa_fisica', 'fakeToken').subscribe(
                endereco => expect(endereco).toEqual(expectedAddress),
                fail
            );

            // AddressService should have made one request to POST address from expected URL
            const req = httpTestingController.expectOne(addressService.baseUrl + '/endereco-pf/' + 1);
            expect(req.request.method).toEqual('GET');

            // Respond with the mock address
            req.flush(expectedAddress);
        });
    });

    describe('#update', () => {

        it('should update a address and return it', () => {

            addressService.update(1, expectedAddress, 'pessoa_fisica', 'fakeToken').subscribe(
                data => expect(data).toEqual(expectedAddress, 'should return atividade'),
                fail
            );

            // AddressService should have made one request to PUT address
            const req = httpTestingController.expectOne(addressService.baseUrl + `/endereco-pf/${1}`);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(expectedAddress);

            // Expect server to return the address after PUT
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: expectedAddress });
            req.event(expectedResponse);
        });
    });

});
