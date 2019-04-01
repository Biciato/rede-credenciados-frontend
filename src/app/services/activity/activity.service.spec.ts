import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Atividades } from '../../models/atividades';
import { ActivityService } from './activity.service';

describe('ActivityService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let actService: ActivityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [ HttpClientTestingModule ],
            // Provide the service-under-test and its dependencies
            providers: [
                ActivityService
            ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        actService = TestBed.get(ActivityService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    /// ActivityService method tests begin ///

    describe('#register', () => {
        let expectedAtividades: Atividades;

        beforeEach(() => {
            actService = TestBed.get(ActivityService);
            expectedAtividades = { atividades: 'Acuidade Visual' } as Atividades;
        });

        it('should return expected atividades (called once)', () => {

            actService.register({ tipo_pessoa: 'pessoa_fisica'}).subscribe(
                atividades => expect(atividades).toEqual(expectedAtividades, 'should return expected atividades'),
                fail
            );

            // ActivityService should have made one request to POST atividades from expected URL
            const req = httpTestingController.expectOne(actService.baseUrl + '/register-atividade-pf');
            expect(req.request.method).toEqual('POST');

            // Respond with the mock atividades
            req.flush(expectedAtividades);
        });
    });

    describe('#update', () => {

        it('should update a activity and return it', () => {

            const updateAtividade: Atividades = { id: 1, atividades: 'Acuidade Visual' };

            actService.update(updateAtividade.id, updateAtividade.atividades, 'pessoa_fisica', 'fakeToken').subscribe(
                data => expect(data).toEqual(updateAtividade, 'should return atividade'),
                fail
            );

            // ActivityService should have made one request to PUT atividades
            const req = httpTestingController.expectOne(actService.baseUrl + `/atividade-pf/${updateAtividade.id}`);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual({atividades: updateAtividade.atividades});

            // Expect server to return the atividade after PUT
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: updateAtividade });
            req.event(expectedResponse);
        });
    });

    describe('#getActivityNames', () => {

        it('should return atividade name list', () => {
            const expectedAtividadeNome = { id: 1, atividade: 'Acuidade Visual' };
            actService.getActivityNames(1).subscribe(
                data => expect(data).toEqual(expectedAtividadeNome)
            );

            // ActivityService should have made one request to POST atividades from expected URL
            const req = httpTestingController.expectOne(actService.baseUrl + '/atividades/' + 1);
            expect(req.request.method).toEqual('GET');

            // Respond with the mock atividades
            req.flush(expectedAtividadeNome);
        });
    });
});
