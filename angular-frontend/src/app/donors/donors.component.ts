import { Component, OnInit } from '@angular/core';
import { DonorService, DonorDto } from '../services/donor.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css'],
  standalone: false
})
export class DonorsComponent implements OnInit 
{ 
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; //used in dropdown menu
  donors: DonorDto[] = [];
  errorMessage: string | null = null;
  // when click remove message box
  clearError(): void 
  {
  this.errorMessage = null;
  }
  

  currentView: 'list' | 'edit' = 'list';  

  constructor(private donorService: DonorService) {}

  // search
  searchQuery: string = '';
  filteredDonors: DonorDto[] = [];

  filterDonors(): void
   {
      const query = this.searchQuery.toLowerCase();

      this.filteredDonors = this.donors.filter(d =>
          d.donorName.toLowerCase().includes(query) ||
          d.donorGroup.toLowerCase().includes(query) ||
          d.donorPh.toLowerCase().includes(query) ||
          d.donorMail.toLowerCase().includes(query) ||
          d.donorAddress.toLowerCase().includes(query)
        );
   }

  // search end
  ngOnInit(): void 
  {
    this.loadDonors();
  }
  // fn to load dto list from rest req to serv to here 
  loadDonors(): void
   {
      this.donorService.getAllDonors().subscribe(
        data => {
          this.donors = data;
          this.filteredDonors = data; // initialize filtered view
        },
        error => this.errorMessage = 'Failed to load donors.'
      );
    }

 
  
  
  // buttons changing view for donors
  editDonor(): void {
    this.currentView = 'edit';  
  }

  backToList(): void {
    this.currentView = 'list';  
    this.loadDonors();          
  }
  // buttons changing view for donors *end


  // this is for entire edit sthalam update,delete overlay
  showOverlay = false;
  openOverlay(): void {
    this.showOverlay = true;
  }

  closeOverlay(): void {
    this.showOverlay = false;
  }
  // this if for entire edit sthalam update,delete overlay *end

  // for create donor stuff

  createError: string | null = null;
  createErrorOverlay=false;
  showSuccessMessage = false;
  newDonor: DonorDto = 
  {
    
    donorName: '',
    donorGroup: '',
    donorPh: '',
    donorMail: '',
    donorAddress: ''
  };


 createDonor(): void 
 {
  // Basic validation check
  if (
    !this.newDonor.donorName?.trim() ||
    !this.newDonor.donorGroup?.trim() ||
    !this.newDonor.donorPh?.trim() ||
    !this.newDonor.donorMail?.trim() ||
    !this.newDonor.donorAddress?.trim()
  ) {
    this.createError = 'All fields are required.';
    this.createErrorOverlay = true;
    return;
  }

  this.donorService.createDonor(this.newDonor).subscribe({
    next: () => {
      this.createErrorOverlay = false;
      this.loadDonors();
      this.closeOverlay();
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.newDonor = {
        donorName: '',
        donorGroup: '',
        donorPh: '',
        donorMail: '',
        donorAddress: ''
      };
    },
    error: () => {
      this.createError = "Failed to create donor";
      this.createErrorOverlay = true;
    }
  });
 }



// createdonor stuff over



  // delete donor stuff
  deleteOverlay =false;
  
  
  deletedDonor: DonorDto=
  {
    donorId:0,
    donorName: '',
    donorGroup: '',
    donorPh: '',
    donorMail: '',
    donorAddress: ''
  };
  deleteId=0;
  openDeleteOverlay(donor:DonorDto) : void
  {
    this.deleteOverlay=true
    this.deletedDonor=donor;
    this.errorMessage=null;
    if (donor.donorId !== undefined) 
      {
        this.deleteId = donor.donorId;
      } else 
      {
         console.error("Donor ID is undefined.");
      }

  }
  deleteFailMessage=false;
  showDeleteSuccessMessage=false;
 deleteDonor(): void 
  { 
    this.donorService.deleteDonor(this.deleteId).subscribe
    (
      {
        next:()=>
          {   
            this.deleteId=0;
            this.backToList();
            this.editDonor();
            this.deleteOverlay=false;
            this.showDeleteSuccessMessage=true;
            setTimeout(() => {
                                this.showDeleteSuccessMessage = false;
                             }, 3000);
          },
        error:()=>
          {
            
            this.deleteFailMessage=true;
            
          }

      }
    );
    // this.deleteOverlay=false;
  }



  closeDeleteOverlay(): void {
  this.deleteOverlay = false;
  this.deletedDonor = 
  {
    donorId: 0,
    donorName: '',
    donorGroup: '',
    donorPh: '',
    donorMail: '',
    donorAddress: ''
  };
}



  // delete donor stuff over

    // Update DOnor stuff

         selectedDonor: DonorDto =
          {
             donorId: 0,
             donorName: '',
             donorGroup: '',
             donorPh: '',
             donorMail: '',
             donorAddress: ''
          };
         showUpdateOverlay: boolean = false;

          updateId = 0;
          openEditOverlay(donor: DonorDto): void 
          {
            this.selectedDonor = { ...donor }; // shallow copy to avoid direct mutation i.e. if change made to
                                                  // selected due to ng change happenb to donor too
            this.showUpdateOverlay = true;

            if(this.selectedDonor.donorId!==undefined)
            {
              this.updateId=this.selectedDonor.donorId;
            }
            else
            {
              console.error("Donor id is null");
            }
          }

          closeEditOverlay(): void  
          {
             this.showUpdateOverlay = false;
             this.selectedDonor = 
             {
               donorId: 0,
               donorName: '',
               donorGroup: '',
               donorPh: '',
               donorMail: '',
               donorAddress: ''
             };
          }
          showUpdateSuccessMessage=false;
          updateFailMessage=false;
          updateDonor(): void 
          {
              this.donorService.updateDonor(this.updateId,this.selectedDonor).subscribe
              (
                {
                  next:()=>
                    {
                      this.updateId=0;
                      this.showUpdateOverlay=false;
                      this.backToList();
                      this.editDonor();
                      this.selectedDonor = 
                       {
                         donorId: 0,
                         donorName: '',
                         donorGroup: '',
                         donorPh: '',
                         donorMail: '',
                         donorAddress: ''
                       };
                       this.showUpdateSuccessMessage=true;
                       setTimeout(()=>this.showUpdateSuccessMessage=false,3000);

                    },
                  error:()=>
                    {
                      this.updateFailMessage=true;
                    }
                }
              );
          }

    // Update DOnor stuff end
    
  

}
