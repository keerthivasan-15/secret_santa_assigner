export class SecretSantaAssigner {
  constructor(currentEmployees, previousAssignments) {
    this.employees = currentEmployees;
    this.previousAssignments = previousAssignments;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  isPreviousMatch(santa, child) {
    return this.previousAssignments.some(
      assignment => 
        assignment.Employee_Name === santa.Employee_Name && 
        assignment.Secret_Child_Name === child.Employee_Name
    );
  }

  assignSecretSanta() {
    //destructure the employees and availableChildren
    const employees = [...this.employees];
    const availableChildren = [...this.employees];
    const assignments = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      try {
        assignments.length = 0;
        const tempAvailableChildren = [...availableChildren];
        
        for (const santa of employees) {
          // Filter out invalid children (self and previous year's match)
          const validChildren = tempAvailableChildren.filter(child => 
            child.Employee_Name !== santa.Employee_Name && 
            !this.isPreviousMatch(santa, child)
          );

          if (validChildren.length === 0) {
            throw new Error('No valid children available');
          }

          // Randomly select a child
          const randomIndex = Math.floor(Math.random() * validChildren.length);
          const selectedChild = validChildren[randomIndex];

          // Remove selected child from available pool
          const childIndex = tempAvailableChildren.findIndex(
            child => child.Employee_Name === selectedChild.Employee_Name
          );
          tempAvailableChildren.splice(childIndex, 1);

          // Add assignment
          assignments.push({
            Employee_Name: santa.Employee_Name,
            Employee_EmailID: santa.Employee_EmailID,
            Secret_Child_Name: selectedChild.Employee_Name,
            Secret_Child_EmailID: selectedChild.Employee_EmailID
          });
        }

        // If we made it here, we have a valid solution
        return assignments;
      } catch (error) {
        attempts++;
        this.shuffleArray(availableChildren);
      }
    }

    throw new Error('Could not find valid Secret Santa assignments after maximum attempts');
  }
}