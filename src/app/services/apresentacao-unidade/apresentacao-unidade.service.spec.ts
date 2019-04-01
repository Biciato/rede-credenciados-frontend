import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ApresentacaoUnidadeService } from './apresentacao-unidade.service';

describe('ApresentacaoUnidadeService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let apresUniService: ApresentacaoUnidadeService;
    const expectedApresentacao = { apresentacao: 'Teste' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [ HttpClientTestingModule ],
            // Provide the service-under-test and its dependencies
            providers: [
                ApresentacaoUnidadeService
            ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        apresUniService = TestBed.get(ApresentacaoUnidadeService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    /// ApresUnidService method tests begin ///

    describe('#get', () => {
        it('should return expected address (called once)', () => {

            apresUniService.get(1, 'fakeToken').subscribe(
                apresentacao => expect(apresentacao).toEqual(expectedApresentacao),
                fail
            );

            // ApresUnidService should have made one request to POST apresentacao from expected URL
            const req = httpTestingController.expectOne(apresUniService.baseUrl + '/apresentacao-unidade/' + 1);
            expect(req.request.method).toEqual('GET');

            // Respond with the mock apresentacao
            req.flush(expectedApresentacao);
        });
    });

    describe('#update', () => {

        it('should update a apresentacao and return it', () => {

            apresUniService.update(1, expectedApresentacao.apresentacao, 'fakeToken').subscribe(
                data => expect(data).toEqual(expectedApresentacao, 'should return apresentacao'),
                fail
            );

            // ApresUnidService should have made one request to PUT apresentacao
            const req = httpTestingController.expectOne(apresUniService.baseUrl + `/apresentacao-unidade/${1}`);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(expectedApresentacao);

            // Expect server to return the apresentacao after PUT
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: expectedApresentacao });
            req.event(expectedResponse);
        });
    });

});
