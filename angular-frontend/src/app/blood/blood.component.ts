import { Component } from '@angular/core';
import { BloodService, Blood } from '../services/blood.service';

@Component({
  selector: 'app-blood',
  standalone: false,
  templateUrl: './blood.component.html',
  styleUrl: './blood.component.css'
})
export class BloodComponent {
  constructor(private bloodService: BloodService) {}

  currentView: 'list' | 'input' = 'list';

  blood: Blood[] = [];

  

  

  errorMessage: string | null = null;
  clearError(): void {
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.loadBlood();
  }

  loadBlood(): void {
    this.bloodService.getAllBlood().subscribe(
      data => this.blood = data,
      error => this.errorMessage = 'Failed to load blood inventory.'
    );
  }

  // update inventory stuff

  
  isUpdateOverlayVisible: boolean = false;

  // bloodgroupum and unit venam so we do this kay value pair aayit =====
  editableBlood: { [key: string]: number } = {};

  updateOverlay(): void 
  {
    // load blodd fnil ulla blood vechit aan kittune
    this.editableBlood = {};
    this.blood.forEach(viewBlood => 
      {
        this.editableBlood[viewBlood.bloodGroup] = viewBlood.availableUnits;
      });
    this.isUpdateOverlayVisible = true;
  }


  cancelUpdate(): void 
  {
    this.isUpdateOverlayVisible = false;
  }

  increaseUnits(group: string): void 
  {
    this.editableBlood[group]++;
  }

  decreaseUnits(group: string): void 
  { 
    if (this.editableBlood[group] > 0) 
      {
        this.editableBlood[group]--;
      }
  }

  sanitizeInput(group: string): void 
  {
    if (this.editableBlood[group] < 0 || isNaN(this.editableBlood[group])) 
    {
      this.editableBlood[group] = 0;
    }
  }
  
  // Confirm update 
  showSuccessMessage=false;
  confirmUpdate(): void 
  {
    const updateObservables = [];

        
          for (const group in this.editableBlood) 
            {
                const updatedBlood: Blood = 
                {
                      bloodGroup: group,
                      availableUnits: this.editableBlood[group]
                };

                    updateObservables.push(this.bloodService.updateBloodUnits(updatedBlood));
            }

          // Execute all requests
            Promise.all(updateObservables.map(obs => obs.toPromise()))
            .then(() => {
                           this.loadBlood();  // Refresh table
                           this.isUpdateOverlayVisible = false;
                           this.showSuccessMessage= true;
                          setTimeout(() => this.showSuccessMessage = false, 3000);
                        })
            .catch(error => {
                              this.errorMessage = 'Failed to update inventory.';
                              console.error(error);
                            });
  }

  showError=false;

}
