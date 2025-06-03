import { Component, OnInit } from '@angular/core';
import { HospitalEntity, HospitalUserService } from '../../services/hospital-user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: HospitalEntity;
  editableProfile!: HospitalEntity;
  errorMessage: string = '';
  isEditMode: boolean = false;
  showSuccessMessage: boolean = false;
  showPasswordOverlay: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';

  constructor(private hospitaluserservice: HospitalUserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const mail = localStorage.getItem('hospitalEmail');
    if (mail) {
      this.hospitaluserservice.viewProfile(mail).subscribe({
        next: (data) => {
          this.profile = data;
          this.editableProfile = { ...data };
        },
        error: () => {
          this.errorMessage = 'User not found';
        }
      });
    } else {
      this.errorMessage = 'No email found in local storage';
    }
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.editableProfile = { ...this.profile };
    }
  }

  saveProfile() {
    if (!this.profile || !this.profile.hospitalId) return;

    this.hospitaluserservice.updateProfile(this.profile.hospitalId, this.editableProfile).subscribe({
      next: (updated) => {
        this.profile = updated;
        this.isEditMode = false;
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to update profile';
      }
    });
  }

  openPasswordOverlay() {
    this.showPasswordOverlay = true;
    this.passwordError = '';
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  closePasswordOverlay() {
    this.showPasswordOverlay = false;
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordError = 'Please fill all fields';
      return;
    }

    if (this.oldPassword !== this.profile.hospitalPassword) {
      this.passwordError = 'Old password is incorrect';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'New passwords do not match';
      return;
    }

    // Call the new changePassword service method
    this.hospitaluserservice.changePassword(this.profile.hospitalMail, this.newPassword).subscribe({
      next: (updatedHospital) => {
        this.profile = updatedHospital; // update profile with new password
        this.showSuccessMessage = true;
        this.showPasswordOverlay = false;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
      },
      error: () => {
        this.passwordError = 'Failed to change password';
      }
    });
  }
}
