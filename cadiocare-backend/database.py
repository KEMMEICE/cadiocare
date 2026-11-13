from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Chuỗi kết nối PostgreSQL qua SQLAlchemy (Cấu hình thông số pgAdmin của bạn)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Lamvlog06@localhost:5432/Cadiocare_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Thêm đoạn này để kiểm tra xem code đang kết nối vào đâu và có thấy bảng không:
try:
    inspector = inspect(engine)
    print("=== ĐANG KẾT NỐI DATABASE:", engine.url)
    print("=== CÁC BẢNG TRONG DB NÀY:", inspector.get_table_names())
except Exception as e:
    print("=== LỖI KẾT NỐI:", e)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Chuỗi kết nối PostgreSQL qua SQLAlchemy (Thay đổi 'postgres:matkhau_cua_ban' cho khớp với pgAdmin của bạn)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Lamvlog06@localhost:5432/cadiocare_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency dùng để gọi session database trong các FastAPI Endpoint
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()