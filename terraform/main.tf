provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "weather-app-vpc"
  }
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "weather-app-cluster"
  cluster_version = "1.21"
  subnets         = ["subnet-abcde012", "subnet-bcde012a"]
  vpc_id          = aws_vpc.main.id

  node_groups = {
    example = {
      desired_capacity = 3
      max_capacity     = 5
      min_capacity     = 1

      instance_type = "t3.medium"
    }
  }
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

output "cluster_arn" {
  description = "ARN of the EKS cluster"
  value       = module.eks.cluster_arn
}

output "node_security_group_id" {
  description = "Security group ID for EKS node group"
  value       = module.eks.node_security_groups["example"]
}

