const Course = ({ course }) => {
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1 key={course.id}>{ course.name }</h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return(
      <p>{name} {exercises}</p>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  
    return (
      <h3>total of {sum} exercises</h3>
    )
  }

  export default Course