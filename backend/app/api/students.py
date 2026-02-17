from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.student import Student
from app.schemas.student import StudentOut, StudentCreate

from fastapi import HTTPException


router = APIRouter(prefix="/student", tags=["Students"])


@router.get("/", response_model=list[StudentOut])
def get_student(db: Session = Depends(get_db)):
    return db.query(Student).all()


@router.post("/", response_model=StudentOut)
def create_students(data: StudentCreate, db: Session = Depends(get_db)):
    student = Student(first_name=data.first_name, last_name=data.last_name)
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@router.delete("/{student_id}", status_code=204)
def delete_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()
