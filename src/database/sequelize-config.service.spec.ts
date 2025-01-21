import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeConfigService } from './sequelize-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('SequelizeConfigService', () => {
  let service: SequelizeConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SequelizeConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                'database.host': 'localhost',
                'database.port': 5432,
                'database.user': 'postgres',
                'database.password': 'postgrespassword',
                'database.name': 'tasks',
              };
              return config[key] as string | number;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SequelizeConfigService>(SequelizeConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create TypeOrm options', () => {
    const options = service.createSequelizeOptions();

    const mockOptions = {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgrespassword',
      database: 'tasks',
      autoLoadModels: true,
      synchronize: true,
    };

    expect(options).toEqual(mockOptions);
  });
});
