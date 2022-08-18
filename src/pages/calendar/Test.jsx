import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

function Test() {
  return (
    <ScheduleComponent height="250px" width="800px"
    className="App">
               <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />

    </ScheduleComponent>
  );
}

export default Test;
